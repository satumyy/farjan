
import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeProvider, Text } from 'react-native-elements';
import { StyleSheet, View, TextInput, FlatList, Modal, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from './SettingsScreen';
import TaskScreen from './TaskScreen';



export default function App() {


  const Tab = createBottomTabNavigator();



  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Farjan" component={TaskScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>   
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