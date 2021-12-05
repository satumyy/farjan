
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import { StyleSheet, View, TextInput, FlatList, Modal } from 'react-native';


export default function SettingsScreen({ navigation }) {
  
  const [jmlnick, setJmlnick] = useState('');
  const [settings, setSettings] = useState([]);
  const [tasks, setTasks] = useState([]);

  const db  = SQLite.openDatabase('taskdb.db');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists settings (key text, value text);');
            tx.executeSql('create table if not exists task (id integer primary key not null, task text, done integer, picture text);');
          }, null, updateTaskList);
        updateSettings();
    });
    return unsubscribe;
  }, []);

  const updateSettings= () =>{
    db.transaction(tx => {
      tx.executeSql('select * from settings;', [], (_, {rows}) =>
        setSettings(rows._array)
      ); 
    });
  }


  const updateTaskList= () =>{
    db.transaction(tx => {
      tx.executeSql('select * from task;', [], (_, {rows}) =>
        setTasks(rows._array)
      ); 
    });
  }

  const dropDb= () => {
    db.transaction(tx => {
      tx.executeSql('drop table task;');
      tx.executeSql('drop table settings;');
    }, null, setTasks([]));
  }

  const setUp= () => {
    db.transaction(tx  => {
      tx.executeSql('create table if not exists settings (key text, value text);');
      tx.executeSql('create table if not exists task (id integer primary key not null, task text, done integer, picture text);');
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
  }

  return (
    
    <View style={styles.container}>
      <Text h1>Settings</Text>
      <Text>{tasks.length}</Text>
      <Button onPress={dropDb} title="drop db" />   
      <Button onPress={setUp} title="set up" />
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