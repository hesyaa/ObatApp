import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Logo, responsiveWidth} from '../../assets';
import {CText} from '../../components';
import {Colors} from '../../assets/Styles/Colors';
import Auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
export class index extends Component {
  async componentDidMount() {
    const {navigation, isLogin} = this.props;
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 2000);
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Logo} />
        <CText style={styles.title}>Obat Kita</CText>
      </View>
    );
  }
}

const mapStateToDispatch = send => {
  return {
    isLogin: data =>
      send({
        type: 'USER-LOGIN',
        payload: data,
      }),
    currentUser: data =>
      send({
        type: 'CURRENT-USER',
        payload: data,
      }),
  };
};
export default connect(mapStateToDispatch)(index);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontSize: responsiveWidth(64),
  },
});
