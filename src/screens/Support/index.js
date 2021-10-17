import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Colors, responsiveHeight, responsiveWidth} from '../../assets';
import {CIcon, CText} from '../../components';

export default class index extends Component {
    constructor(props){
        super(props)
    }

  render() {
      const {navigation} = this.props
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={styles.header}>
          <CIcon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
          />
          <View style={{marginHorizontal:10}}>
            <CText style={styles.title}>Support</CText>
          </View>
        </View>
        <ScrollView>
          <View style={{margin: 10}}>
            <CText style={styles.subTitle}>
              Thanks for downloading our apps
            </CText>
            <CText style={styles.title}>
              Created with Love by Obat Kita's Team
            </CText>
            <CText style={styles.subTitle}>Herdy Syahrul · as a Leader</CText>
            <CText style={styles.subTitle}>
              Mahrus Rohisyam · as a Developer
            </CText>
            <CText style={styles.subTitle}>Dio Ariawan · as a Developer</CText>
            <CText style={styles.subTitle}>
              Arif Saepulloh · as a Developer
            </CText>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveWidth(18),
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: Colors.grey,
  },
  header: {
    width: '100%',
    height: responsiveHeight(100),
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: Colors.white,
    elevation: 5,
    paddingHorizontal: 10,
  },
});
