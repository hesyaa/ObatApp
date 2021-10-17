import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import {CText} from '.';
import {Colors, responsiveHeight, responsiveWidth, StarActive} from '../assets';
import MI from 'react-native-vector-icons/MaterialIcons';

export default class personCard extends Component {
  render() {
    const {image} = this.props;
    return (
      <Pressable onPress={this.props.onPress} style={styles.mainContainer}>
        <View style={styles.imageWrapper}>
          {image ? (
            <Image
              style={styles.image}
              source={{uri: this.props.image}}
              resizeMethode="cover"
            />
          ) : (
            <MI style={styles.image} name="person" size={responsiveWidth(80)} />
          )}
        </View>
        <View style={styles.textWrapper}>
          <View>
            <CText style={styles.username}>{this.props.name}</CText>
            <CText style={{...styles.text, ...{color: Colors.secondary}}}>
              {this.props.profession}
            </CText>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <CText style={styles.miscText}>{this.props.post}</CText>
              <CText style={styles.miscText}> Postingan</CText>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CText style={styles.miscText}> · {this.props.rating}</CText>
              <CText style={styles.miscText}> Rating Point</CText>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: Colors.white,
    elevation: 10,
    borderRadius: 15,
  },
  imageWrapper: {
    marginHorizontal: 5,
  },
  textWrapper: {
    maxWidth: '75%',
    padding: 5,
  },
  image: {
    borderRadius: 20,
    width: responsiveWidth(80),
    height: responsiveHeight(100),
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  username: {
    fontSize: 18,
    color: Colors.primary,
  },
  iconRating: {
    width: responsiveWidth(15),
    height: responsiveHeight(25),
    marginHorizontal: 5,
  },
  miscText:{
      fontSize:responsiveWidth(14),
      fontWeight:'bold'
  }
});
