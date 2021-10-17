import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  HomeActive,
  DiscoverActive,
  ProfileActive,
  Home,
  Colors,
  Profile,
  Discover,
  AddPost,
  AddPostActive,
} from '../../assets';
const TabItem = ({isFocused, onPress, label, onLongPress, index}) => {
  const Icon = () => {
    if (label == 'Home') {
      return isFocused ? (
        <Image source={HomeActive} />
      ) : (
        <Image source={Home} />
      );
    }
    if (label == 'Discover') {
      return isFocused ? (
        <Image source={DiscoverActive} />
      ) : (
        <Image source={Discover} />
      );
    }
    if (label == 'AddRecipe') {
      return isFocused ? (
        <Image source={AddPostActive} />
      ) : (
        <Image source={AddPost} />
      );
    }
    if (label == 'Profile') {
      return isFocused ? (
        <Image source={ProfileActive} />
      ) : (
        <Image source={Profile} />
      );
    }
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        key={index}
        accessibilityRole="button"
        accessibilityState={isFocused ? {selected: true} : {}}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.button}>
        <Icon />
        <Text style={{color: isFocused ? Colors.primary : Colors.grey}}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20.0,

    elevation: 20,
  },
});
