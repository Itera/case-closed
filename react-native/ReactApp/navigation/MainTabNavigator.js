import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import DashboardScreen from '../screens/DashboardScreen';
import MotionScreen from '../screens/MotionScreen';
import ConfigScreen from '../screens/ConfigScreen';
import CameraScreen from "../screens/CameraScreen";

const DashboardStack = createStackNavigator({
  Home: DashboardScreen,
});

DashboardStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const MotionStack = createStackNavigator({
  Links: MotionScreen,
});

MotionStack.navigationOptions = {
  tabBarLabel: 'Motion',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-rocket'}
    />
  ),
};

const CameraStack = createStackNavigator({
  Settings: CameraScreen,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-camera'}
    />
  ),
};

const ConfigStack = createStackNavigator({
  Settings: ConfigScreen,
});

ConfigStack.navigationOptions = {
  tabBarLabel: 'Configuration',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  DashboardStack,
  MotionStack,
  CameraStack,
  ConfigStack,
});
