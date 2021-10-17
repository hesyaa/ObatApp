import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacityBase, TouchableOpacity} from 'react-native';
import {Colors, responsiveWidth} from '../assets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CText} from '../components';
export default class Type extends Component {
  constructor() {
    super();
    this.state = {
      superStyle: styles.default,
    };
  }
  componentDidMount() {
    const {type} = this.props;
    const {superStyle} = this.state;
    const {green, red, yellow} = styles;
    if (type == 'ringan') {
      this.setState({
        superStyle: green,
      });
    }
    if (type == 'sedang') {
      this.setState({
        superStyle: yellow,
      });
    }
    if (type == 'keras') {
      this.setState({
        superStyle: red,
      });
    }
  }
  render() {
    const {superStyle} = this.state;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{...styles.default, ...superStyle}}>
          <CText style={{...styles.title, ...superStyle}}>
            {' '}
            {this.props.type}{' '}
          </CText>
        </View>
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon name="info" size={responsiveWidth(25)} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    width: responsiveWidth(100),

    padding: 3,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  green: {
    backgroundColor: Colors.green,
    borderRadius: 20,
  },
  red: {
    backgroundColor: Colors.red,
    borderRadius: 20,
    color: Colors.white,
  },
  yellow: {
    backgroundColor: Colors.yellow,
    borderRadius: 20,
  },
  title: {
    color: Colors.black,
  },
});
