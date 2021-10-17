import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {Colors} from '../assets';
import {responsiveHeight, responsiveWidth} from '../assets/uttils';
import CText from './CText';
export class FeaturedCard extends Component {
  render() {
    const {style} = this.props;
    return (
      <View style={{...{paddingVertical: 10, ...this.props.mainView}}}>
        <TouchableOpacity
          style={{...styles.btn, ...style}}
          onPress={this.props.onPress}>
          <Image
            resizeMode={this.props.resize}
            style={{...styles.featureIcon, ...this.props.imageStyle}}
            source={this.props.source}
          />
          <CText style={{...styles.title, ...this.props.textStyle}}>
            {this.props.children}
          </CText>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FeaturedCard;
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: responsiveWidth(120),
    height: responsiveHeight(140),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20.0,

    elevation: 5,
  },
  title: {
    fontSize: 16,
    paddingVertical: 3,
  },
  featureIcon: {
    width: responsiveWidth(60),
    height: responsiveHeight(80),
  },
});
