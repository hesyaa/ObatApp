import React, {Component} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {CText} from '.';
import {Colors, responsiveHeight, responsiveWidth} from '../assets';
import MI from 'react-native-vector-icons/MaterialIcons';
export class Comment extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const {userImage} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={userImage ? styles.userImage : styles.iconWrapper}>
          {userImage ? (
            <Image source={{uri: this.props.userImage}} />
          ) : (
            <MI name="person" size={responsiveWidth(50)} />
          )}
        </View>
        <View>
          <CText>
            {this.props.name}
            <CText> · {this.props.date}</CText>
          </CText>
          <CText>{this.props.content}</CText>
        </View>
      </View>
    );
  }
}
export default Comment;
const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: Colors.grey,
    borderRadius: 50,
    width: responsiveWidth(70),
    height: responsiveWidth(70),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  mainContainer: {flexDirection: 'row', marginVertical: 10, flex: 1},
});
