import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../assets';
import {responsiveHeight, responsiveWidth} from '../assets/uttils';
import CText from './CText';
export class CButton extends Component {
  render() {
    const {style, textStyle} = this.props;
    return (
      <View>
        <TouchableOpacity
          style={{...styles.btn, ...style}}
          onPress={this.props.onPress}>
          <CText style={{...styles.txt, ...textStyle}}>
            {this.props.children}
          </CText>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CButton;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: responsiveWidth(350),
    height: responsiveHeight(70),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 8,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Montserrat-thin',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
});
