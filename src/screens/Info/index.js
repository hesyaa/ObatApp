import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Colors, responsiveHeight, responsiveWidth} from '../../assets';
import {CIcon, CText, Type} from '../../components';

export default class index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={styles.header}>
          <CIcon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
          />
          <View style={{marginHorizontal: 10}}>
            <CText style={styles.title}>Information</CText>
          </View>
        </View>
        <ScrollView>
          <View style={{margin: 10}}>
            <CText style={styles.title}>Ringan</CText>
            <Type type="ringan" />
            <CText style={styles.content}>
              Ini menandakan bahwa obat yang di posting berkekuatan ringan dan
              boleh dikonsumsi oleh siapa saja tanpa harus menyertakan resep
              dokter terlebih dahulu.
            </CText>
          </View>
          <View style={{margin: 10}}>
            <CText style={styles.title}>Sedang</CText>
            <Type type="sedang" />
            <CText style={styles.content}>
              Ini menandakan bahwa obat yang di posting berkekuatan sedang dan
              boleh dikonsumsi oleh siapa saja tanpa harus menyertakan resep
              dokter terlebih dahulu dengan catatan anda bijak dalam pengguanaannya.
            </CText>
          </View>
          <View style={{margin: 10}}>
            <CText style={styles.title}>Kers</CText>
            <Type type="keras" />
            <CText style={styles.content}>
              Ini menandakan bahwa obat yang di posting berkekuatan keras dan
              tidak boleh dikonsumsi oleh siapa saja tanpa resep
              dokter terlebih dahulu.
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
