
import React, { useState, useEffect, useRef } from 'react';
import * as SQLite from 'expo-sqlite';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import { StyleSheet, View, TextInput, FlatList, Image } from 'react-native';
import{ Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';


export default function TaskScreen({ navigation }) {

  const isFocused = useIsFocused();

  const [picture, setPicture] = useState('');
  const [jmlnick, setJmlnick] = useState('');
  const [tasks, setTasks] = useState([]);
  const [settings, setSettings] = useState([]);
  const [hasCameraPermission, setPermission] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  

  const camera= useRef(null);
  const db  = SQLite.openDatabase('taskdb.db');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists settings (key text, value text);');
        tx.executeSql('create table if not exists task (id integer primary key not null, task text, done integer, picture text);');
      }, null, updateTaskList);
      updateSettings();
      updateNick();
      askCameraPermission();
    });
    return unsubscribe;
  }, []);

  const updateTaskList= () =>{
    db.transaction(tx => {
      tx.executeSql('select * from task;', [], (_, {rows}) =>
        setTasks(rows._array)
      ); 
    });
  };

  const updateSettings= () =>{
    db.transaction(tx => {
      tx.executeSql('select * from settings;', [], (_, {rows}) =>
        setSettings(rows._array)
      ); 
    });
  };

  const updateNick= () =>{
    db.transaction(tx => {
      tx.executeSql('select value from settings where key=?;', ['nick'], (_, {rows}) =>
        setJmlnick(rows._array[0].value)
      ); 
    });
  };

  const taskDone= (id) => {
    let picture = photoName;
    db.transaction(tx => {
      tx.executeSql('update task set done=1 where id=(?);',[id]);
      tx.executeSql('update task set picture=(?) where id=(?);',[picture, id]);
    }, null, updateTaskList);
  };

  const SendPoints= () => {

  };

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
  };

  const snap= async() => {
    if (camera) {
      const photo= await camera.current.takePictureAsync({base64:true});
      setPhotoName(photo.uri);
    }
  };

  
  const askCameraPermission=  async() => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    setPermission( status == 'granted');
  };


  return (

    <View style={styles.container}>
      { isFocused && hasCameraPermission ? 
        ( <View style={{ flex:1 }}>
            <Camera style={{ flex:4 }} ref ={camera} ratio={'1:1'} />
          <View>
            <Button title="Take Photo" onPress={snap} />
          </View>
      </View>
      ) : (
        <Text>No access to camera</Text>
      )}



        {(() => {
          if (tasks.length == 0){
            return (
              <View>
                  <Text>What is your JML nick?</Text>
                  <TextInput 
                    placeholder='JML nick' 
                    onChangeText={
                      jmlnick => setJmlnick(jmlnick)
                    }
                    value={jmlnick}
                  /> 
                  <Button onPress={setUp} title="Start färjan experience" />
              </View>
            )
          }
          return <Text>Make Farjan great again {jmlnick}!</Text>;
        })()}

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
                  <><Text>{item.task} {item.done} {}</Text>
                  <Button onPress={() => taskDone(item.id)} title="tehty"></Button></>
                )
              }
              return (
                <View>
                <Text>{item.task} done!</Text>
                <Image style={{ width:100, height:100 }} source={{uri : item.picture}} />
                </View>
              );
            })()}
          </View>
          }
        />
    </View>
   
  )
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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