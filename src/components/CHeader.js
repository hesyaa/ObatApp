import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {CText, CIcon} from '.';
import {Colors, responsiveHeight} from '../assets';
export default class CHeader extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View>
          <CText style={styles.title}>Welcome Back</CText>
          <CText style={styles.subTitle}>How are you feeling Today?</CText>
        </View>
        <CIcon />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: responsiveHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: Colors.grey,
  },
});
