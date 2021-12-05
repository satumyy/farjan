
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import { StyleSheet, View, TextInput, FlatList, Modal } from 'react-native';


export default function SettingsScreen() {

  
  const [jmlnick, setJmlnick] = useState('');
  const [settings, setSettings] = useState([]);
  const [tasks, setTasks] = useState([]);

  const db  = SQLite.openDatabase('taskdb.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists settings (key text, value text);');
      tx.executeSql('create table if not exists task (id integer primary key not null, task text, done integer, picture text);');
      tx.executeSql('select * from task;', [], (_, {rows}) => {
        setTasks(rows._array);
      }); 
    });
    updateSettings(); 
  }, []);

  const updateSettings= () =>{
    db.transaction(tx => {
      tx.executeSql('select * from settings;', [], (_, {rows}) =>
        setSettings(rows._array)
      ); 
    });
  }

  const dropDb= () => {
    db.transaction(tx => {
      tx.executeSql('drop table task;');
      tx.executeSql('drop table settings;');
    }, null, setTasks([]));
  }

  return (
    
    <View style={styles.container}>
      <Text h1>Settings</Text>
      <Text>{tasks.length}</Text>
      <Button onPress={dropDb} title="drop db" />   
    </View> 
    
  )

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