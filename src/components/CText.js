import React from 'react';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {responsiveWidth} from '../assets';

export default class CText extends React.Component {
  state = {
    isBold: Platform.select({
      ios: {
        fontFamily: 'Montserrat-Medium',
      },
      android: {
        fontFamily: 'Montserrat-Medium',
      },
      web: {
        fontFamily: 'Montserrat-Medium',
      },
    }),
  };

  render() {
    const {style, inline, bold} = this.props;

    const {isBold} = this.state;

    let _bold = bold ? isBold : {};

    if (inline) {
      return (
        <Text {...this.props} style={{...styles.text, ...style, ..._bold}}>
          {this.props.children}
        </Text>
      );
    }

    return (
      <>
        <Text {...this.props} style={{...styles.text, ...style, ..._bold}}>
          {this.props.children}
        </Text>
      </>
    );
  }
}

const styles = {
  text: {
    fontSize: responsiveWidth(14),
    color: '#1e1e1e',
    fontStyle: 'normal',
    ...Platform.select({
      ios: {
        fontFamily: 'Montserrat-Medium',
      },
      android: {
        fontFamily: 'Montserrat-Medium',
      },
      web: {
        fontFamily: 'Montserrat-Medium',
      },
    }),
    ...Platform.select({
      web: {
        letterSpacing: 'normal',
      },
    }),
  },
};

//Font family is Montserrat
// lists
// Montserrat-Bold
// Montserrat-Light
// Montserrat-Medium
// Montserrat-SemiBold
