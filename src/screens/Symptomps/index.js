import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Batuk,
  Asma,
  Meriang,
  Demam,
  responsiveWidth,
  Colors,
  responsiveHeight,
} from '../../assets';
import {CIcon, CText, FeaturedCard} from '../../components';

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      gejala: [
        {
          name: 'Coronavirus 19',
          thumbnail:
            'https://asset.kompas.com/crops/WC4ZnRwn6wnKCnP4wGcP3z_sBpQ=/0x0:900x600/750x500/data/photo/2021/07/16/60f15b9c787aa.png',
          link: 'https://www.kompas.com/tren/read/2021/07/17/153000665/infografik--5-gejala-covid-19',
        },
        {
          name: 'Kanker',
          thumbnail:
            'https://res.cloudinary.com/dk0z4ums3/image/upload/v1595847671/attached_image/penyakit-kanker-0-alodokter.jpg',
          link: 'https://www.alodokter.com/penyakit-kanker',
        },
        {
          name: 'Tifus',
          thumbnail:
            'https://mhomecare.co.id/blog/wp-content/uploads/2020/05/Gejala-Tipes.jpg',
          link: 'https://www.alodokter.com/tifus/gejala',
        },
        {
          name: 'Batuk Kering',
          thumbnail:
            'https://s.yimg.com/uu/api/res/1.2/PlP6yAbocSQa2TUFKCTtqw--~B/aD0zNzk7dz02NzM7c209MTthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/ID/bola_hosted_196/28fb708b21d9c1a3b2180454eb5f3eca',
          link: 'https://www.klikdokter.com/penyakit/batuk-kering',
        },
      ],
    };
  }

  render() {
    const {gejala} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        {/* Header Start */}
        <View style={{...styles.wrapper, ...styles.header}}>
          <CIcon onPress={() => navigation.goBack()} name="arrow-back" />
          <CText style={{...styles.text, ...styles.title}}>Gejala</CText>
        </View>
        {/* Header End */}
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
            }}>
            {gejala.map((value, index) => {
              return (
                <View key={index}>
                  <FeaturedCard
                    style={styles.card}
                    key={index}
                    textStyle={styles.contentTitle}
                    imageStyle={styles.contentImage}
                    resize="cover"
                    onPress={() => {
                      navigation.navigate('Article', {link: value.link});
                    }}
                    source={{uri: value.thumbnail}}>
                    {value.name}
                  </FeaturedCard>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  wrapper: {
    margin: 10,
    marginHorizontal: 20,
  },
  text: {
    fontSize: responsiveWidth(16),
  },
  title: {
    fontSize: responsiveWidth(28),
    paddingLeft: '25%',
    fontWeight: 'bold',
  },
  card: {
    width: responsiveWidth(375),
    minHeight: responsiveHeight(300),
    maxHeight: responsiveHeight(500),
    alignItems: 'flex-start',
    padding: 0,
  },
  contentTitle: {
    marginHorizontal: '5%',
  },
  contentImage: {
    width: responsiveWidth(365),
    minHeight: responsiveHeight(225),
    maxHeight: responsiveHeight(500),
    borderRadius: 10,
    alignSelf: 'center',
  },
});
