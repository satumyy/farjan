import React from 'react';
import { StyleSheet } from 'react-native';
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
  }
});