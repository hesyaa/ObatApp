import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Discover,
  Home,
  Profile,
  Splash,
  AddRecipe,
  Signup,
  Notification,
  Login,
  Reset,
  Forget,
  News,
  Sypmtomps,
  Post,
  Settings,
  Article,
  Universal,
  Comment,
  AllProfile,
  Support,
  Info,
} from '../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNav from '../BottomTabNavigator/BottomNav';
import Posts from '../../screens/Posts';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Hide = {headerShown: false};

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNav {...props} />}>
      <Tab.Screen name="Home" component={Home} options={Hide} />
      <Tab.Screen name="Discover" component={Discover} options={Hide} />
      <Tab.Screen name="AddRecipe" component={AddRecipe} options={Hide} />
      <Tab.Screen name="Profile" component={Profile} options={Hide} />
    </Tab.Navigator>
  );
};

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Home" component={Home} options={Hide} />
        <Stack.Screen name="Splash" component={Splash} options={Hide} />
        <Stack.Screen name="MainApp" component={MainApp} options={Hide} />
        <Stack.Screen name="AddRecipe" component={AddRecipe} options={Hide} />
        <Stack.Screen name="Signup" component={Signup} options={Hide} />
        <Stack.Screen name="Forget" component={Forget} options={Hide} />
        <Stack.Screen name="Reset" component={Reset} options={Hide} />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={Hide}
        />
        <Stack.Screen name="Login" component={Login} options={Hide} />
        <Stack.Screen name="News" component={News} options={Hide} />
        <Stack.Screen name="Symp" component={Sypmtomps} options={Hide} />
        <Stack.Screen name="Notif" component={Notification} options={Hide} />
        <Stack.Screen name="Settings" component={Settings} options={Hide} />
        <Stack.Screen name="Post" component={Post} options={Hide} />
        <Stack.Screen name="Article" component={Article} options={Hide} />
        <Stack.Screen name="Universal" component={Universal} options={Hide} />
        <Stack.Screen name="Allprofile" component={AllProfile} options={Hide} />
        <Stack.Screen name="Comment" component={Comment} options={Hide} />
        <Stack.Screen name="PostScreen" component={Posts} options={Hide} />
        <Stack.Screen name="Support" component={Support} options={Hide} />
        <Stack.Screen name="info" component={Info} options={Hide} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
