import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors, convertDate, responsiveWidth} from '../assets';
import {CText, CIcon, CButton} from '.';

export default class InfoCard extends Component {
  render() {
    const {imageSource} = this.props;

    return (
      <TouchableOpacity {...this.props} style={styles.contentWrapper}>
        {imageSource ? (
          <Image
            source={{
              uri: this.props.imageSource,
            }}
            style={styles.imageContent}
            resizeMode="cover"
          />
        ) : (
          <ActivityIndicator
            style={styles.imageContent}
            size="large"
            color={Colors.primary}
          />
        )}
        <View style={styles.textContent}>
          <CText style={styles.contentTitle}>{this.props.title}</CText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <CText>{this.props.newsSource}</CText>
              <CText
                style={{
                  fontSize: responsiveWidth(12),
                }}>
                {convertDate(new Date(this.props.newsDate))}
              </CText>
            </View>
            <CText
              style={{
                color: Colors.primary,
                fontSize: responsiveWidth(12),
              }}>
              Read More
            </CText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  contentTitle: {
    fontSize: responsiveWidth(16),
    fontWeight: 'bold',
  },
  contentWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  title: {
    fontSize: responsiveWidth(30),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentHeader: {
    fontSize: responsiveWidth(25),
    fontWeight: 'bold',
    marginVertical: 10,
  },
  imageContent: {
    width: responsiveWidth(120),
    height: responsiveWidth(120),
    borderRadius: 10,
  },
  textContent: {
    width: responsiveWidth(245),
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
});
