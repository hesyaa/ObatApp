import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import {Colors, responsiveHeight, responsiveWidth} from '../assets';

export default class CIcon extends Component {
  render() {
    const {style} = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        style={{...styles.mainContainer, ...style}}>
        <MI name={this.props.name} size={30} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: `${Colors.grey}90`,
  },
});
