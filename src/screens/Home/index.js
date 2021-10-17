import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  banner1,
  Batuk,
  Berita,
  Colors,
  responsiveHeight,
  responsiveWidth,
} from '../../assets';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import {
  CText,
  FeaturedCard,
  RecipeCard,
  CIcon,
  CButton,
} from '../../components/';

export class index extends Component {
  constructor() {
    super();
    this.state = {
      feature: [
        {title: 'Gejala', source: Batuk, route: 'Symp'},
        {title: 'Berita', source: Berita, route: 'News'},
        {title: 'Gejala', source: Batuk, route: 'Symp'},
      ],
      Allposts: [],
      deleteIcon: false,
      limit: 5,
    };
  }

  async componentDidMount() {
    const fire = await Auth().currentUser;
    if (fire !== null) {
      firestore()
        .collection('Users')
        .doc(fire.id)
        .onSnapshot(response => {
          this.props.update(response.data());
        });
    }
    this._loadPosts();
  }

  _loadPosts = () => {
    const {limit} = this.state;
    firestore()
      .collection('POSTS')
      .limit(limit)
      .onSnapshot(value => {
        let datas = value.docs.map(result => {
          return result.data();
        });
        this.setState({
          Allposts: datas,
        });
        datas.forEach(value => {
          return value;
        });
      });
  };

  _loadMorePosts = () => {
    const {limit} = this.state;
    this.setState({
      limit: limit + 5,
    });
  };

  render() {
    const {feature, Allposts, limit} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{backgroundColor: Colors.white}}>
        {/* Header Start */}
        <View style={styles.mainContainer}>
          <View>
            <CText style={styles.title}>Welcome Back</CText>
            <CText style={styles.subTitle}>How are you feeling Today?</CText>
          </View>
          <CIcon
            onPress={() => {
              navigation.navigate('Notif');
            }}
            name="notifications-none"
          />
        </View>
        {/* Header End */}
        {/* Body start */}
        <ScrollView>
          <View style={styles.bannerView}>
            <Image resizeMode="cover" style={styles.banner} source={banner1} />
            <TouchableOpacity
              style={styles.bannerButton}
              onPress={() =>
                navigation.navigate('Article', {
                  link: 'https://covid19.go.id/edukasi/pengantar/pengantar-adaptasi-kebiasaan-baru',
                })
              }>
              <CText style={{color: Colors.white}}>PANDUAN COVID-19</CText>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 10}}>
            <CText style={styles.title}>Layanan</CText>
          </View>
          <View style={styles.featureView}>
            {feature.map((value, index) => {
              return (
                <FeaturedCard
                  onPress={() => {
                    navigation.navigate(value.route);
                  }}
                  key={index}
                  source={value.source}>
                  {value.title}
                </FeaturedCard>
              );
            })}
          </View>

          <View>
            <View style={{marginHorizontal: 10}}>
              <CText style={styles.title}>Resep Terbaru</CText>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                marginBottom: responsiveHeight(120),
              }}>
              {Allposts &&
                Allposts.map((value, index) => (
                  <View style={{marginVertical: 10}} key={index}>
                    <RecipeCard
                      data={value}
                      onPress={() => {
                        navigation.navigate('PostScreen', value);
                      }}
                    />
                  </View>
                ))}
              {Allposts.length >= limit && (
                <CButton
                  style={{alignSelf: 'center', margin: 5}}
                  onPress={() => this._loadMorePosts()}>
                  Load More
                </CButton>
              )}
            </View>
          </View>
        </ScrollView>
        {/* Body End */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userSign: state.userSignup,
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = send => {
  return {
    update: data =>
      send({
        type: 'SIGNUP-ACCOUNT',
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
  banner: {
    width: responsiveWidth(327 * 1.2),
    height: responsiveHeight(147 * 1.2),
  },
  bannerView: {
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 10,
    elevation: 10,
  },
  featureView: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  mainContainer: {
    width: '100%',
    height: responsiveHeight(100),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  title: {
    fontSize: responsiveWidth(18),
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: Colors.grey,
  },
  card: {
    marginVertical: 10,
  },
  bannerButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    margin: 20,
    marginRight: 20,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
});
