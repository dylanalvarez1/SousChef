import React from 'react';
import {View, TextInput, Text} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CameraScreen from './CameraScreen';
import ResultsScreen from './ResultsScreen';

const MainNavigator = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Camera: CameraScreen,
  Results: ResultsScreen
},
{
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;

