
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { Button, ThemeProvider, Text, Tab, TabView } from 'react-native-elements';
import { StyleSheet, View, TextInput, FlatList, Modal } from 'react-native';

export default function App() {
  const [picture, setPicture] = useState('');
  const [jmlnick, setJmlnick] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [settings, setSettings] = useState([]);
  const [index, setIndex] = useState(0);

  const db  = SQLite.openDatabase('taskdb.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists settings (key text, value text);');
      tx.executeSql('create table if not exists task (id integer primary key not null, task text, done integer, picture text);');
      tx.executeSql('select * from task;', [], (_, {rows}) => {
        setTasks(rows._array);
        if(rows._array.length==0){
          setModalVisible(true);
        }
      }); 
    });
    updateSettings(); 
  }, []);



  const updateTaskList= () =>{
    db.transaction(tx => {
      tx.executeSql('select * from task;', [], (_, {rows}) =>
        setTasks(rows._array)
      ); 
    });
  }

  const updateSettings= () =>{
    db.transaction(tx => {
      tx.executeSql('select * from settings;', [], (_, {rows}) =>
        setSettings(rows._array)
      ); 
    });
  }

  const taskDone= (id) => {
    db.transaction(tx => {
      tx.executeSql('update task set done=1 where id=(?);',[id]);
    }, null, updateTaskList)
  }

  const SendPoints= () => {

  }

  const dropDb= () => {
    db.transaction(tx => {
      tx.executeSql('drop table task;');
    }, null, setTasks([]));
  }

  const setUp= () => {
    db.transaction(tx  => {
      tx.executeSql('insert into settings (key, value) values (?, ?);',['nick', jmlnick]);      
      tx.executeSql('insert into task (task, done) values (?, ?);',['JML+??? = profit', 0]);
      tx.executeSql('insert into task (task, done) values (?, ?);',['AMIGAAAA!!1', 0]);
      tx.executeSql('insert into task (task, done) values (?, ?);',['Hytti madness', 0]);
      tx.executeSql('insert into task (task, done) values (?, ?);',['Love Färjan', 0]);
      tx.executeSql('insert into task (task, done) values (?, ?);',['Bongaa Ville Viikinki', 0]);
      tx.executeSql('insert into task (task, done) values (?, ?);',['Kekkonen', 0]);
      tx.executeSql('insert into task (task, done) values (?, ?);',['Buffetti ja sit vedetään taas!', 0]);
      tx.executeSql('insert into task (task, done) values (?, ?);',['Make a demo about it.', 0]);
      tx.executeSql('insert into task (task, done) values (?, ?);',['Discoon Discoon!', 0]);
    }, null, updateSettings);
    updateTaskList();
    setModalVisible(false);
  }

  const theme = {  
    Button: {    
      titleStyle: {      
        color: 'red',    
      },  
    },
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
      <Button onPress={dropDb} title="drop db" /> 
          
          {/*ALOITUS IKKUNA*/}

          
          {/*SOVELLUS*/}

          <Tab value={index} onChange={(e) => setIndex(e)}>  
            <Tab.Item title="BINGO" />  
            <Tab.Item title="Settings" />        
          </Tab>

          <TabView value={index} onChange={setIndex} >  
            <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
              <View>
              <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
              <View>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>What is your JML nick?</Text>
                  <TextInput 
                    placeholder='JML nick' 
                    onChangeText={
                      jmlnick => setJmlnick(jmlnick)
                    }
                    value={jmlnick}
                  /> 
                  <Button onPress={setUp} title="Start färjan experience" />
                </View>
              </View>
          </Modal> 
              <Text h1>BINGO</Text>
              <FlatList
                style={{marginLeft: "5%"}}
                numColumns={3}
                horizontal={false}
                data={tasks}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => 
                <View style={styles.listcontainer}>
                  {(() => {
                    if (item.done == 0){
                      return (
                        <><Text>{item.task} {item.done}</Text>
                        <Button onPress={() => taskDone(item.id)} title="tehty"></Button></>
                      )
                    }
                    return <Text>{item.task} done!</Text>;
                  })()}
                </View>
                }
              />
              <Button onPress={SendPoints} title="Bingo!" />
              </View>
            </TabView.Item>  
            <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>    
              <View>
                <Text h1>Settings</Text>
                <Text>{tasks.length}</Text>
                <Button onPress={dropDb} title="drop db" />   
              </View>  
            </TabView.Item>  
          </TabView>
        
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "20%",
  },
  listcontainer: {
    flexWrap: "wrap",
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});