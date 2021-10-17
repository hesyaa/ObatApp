import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Colors,
  responsiveHeight,
  responsiveWidth,
  StarActive,
  Sad,
} from '../../assets';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import {CIcon, CText, RecipeCard} from '../../components';
import Auth from '@react-native-firebase/auth';

export default class AllProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params,
      rate: false,
      posts: [],
      points: 0,
      deleteIcon: false,
    };
  }

  async componentDidMount() {
    const {data} = this.state;
    this.setState({
      points: data.points,
    });
    firestore()
      .collection('POSTS')
      .where('IdPembuat', '==', data.IdUser)
      .onSnapshot(value => {
        // let datas = []
        let datas = value.docs.map(result => {
          return result.data();
        });
        this.setState({
          posts: datas,
        });
      });
    console.log(data);
  }

  _rate() {
    const {rate, data, points} = this.state;
    // const points = data.points
    // // console.log(data.points)
    // firestore()
    //   .collection('Users')
    //   .doc(data.IdUser)
    //   .update({
    //     points: points+10,
    //   })
    // const {points} = this.state;

    const tambah = points + 10;
    this.setState({
      points: tambah,
    });

    firestore().collection('Users').doc(data.IdUser).update({
      points: tambah,
    });
  }

  render() {
    const {data, rate, posts, points} = this.state;
    const {navigation} = this.props;
    console.log(posts);
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        {/* Profile Header */}
        <View style={{padding: 10}}>
          <CIcon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
          />
        </View>
        {/* User */}
        <ScrollView>
          <View style={styles.profile}>
            <View style={styles.photoWrapper}>
              {data.foto ? (
                <Image source={{uri: data.foto}} style={styles.photo} />
              ) : (
                <View style={[styles.photo, styles.guestPhoto]}>
                  <Icon name="person" size={responsiveWidth(60)} />
                </View>
              )}
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  width: responsiveWidth(235),
                  padding: 8,
                  textAlign: 'center',
                  marginLeft: 5,
                }}>
                <CText
                  style={
                    styles.username
                  }>{`${data.firstname} ${data.lastname}`}</CText>
                <CText style={styles.text}>{data.profession}</CText>
                <CText style={{fontSize: 16}}>{data.status}</CText>
              </View>
            </View>

            <View style={{justifyContent: 'space-around'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{alignItems: 'center'}}>
                  <CText>{posts.length}</CText>
                  <CText>Postingan</CText>
                </View>
                <View style={{alignItems: 'center'}}>
                  <CText>{points}(Pts)</CText>
                  <View style={{flexDirection: 'row'}}>
                    <Image style={styles.icon} source={StarActive} />
                    <CText>Rating</CText>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this._rate();
                    }}
                    style={{...styles.rateBtn}}>
                    <Ion
                      name={rate ? 'ribbon' : 'ribbon-outline'}
                      size={responsiveWidth(20)}
                    />
                    <CText>{rate ? 'Rated' : 'Rate'}</CText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginBottom: responsiveHeight(120),
            }}>
            {posts.length >= 0 ? (
              posts.map((value, index) => (
                <View style={{marginVertical: 10}} key={index}>
                  <RecipeCard
                    data={value}
                    onPress={() => {
                      navigation.navigate('PostScreen', value);
                    }}
                  />
                </View>
              ))
            ) : (
              <View style={{alignItems: 'center'}}>
                {/* Guest */}
                <Image
                  style={{
                    maxWidth: responsiveWidth(100),
                    maxHeight: responsiveWidth(100),
                  }}
                  source={Sad}
                />
                <CText style={{fontSize: 16, paddingVertical: 20}}>
                  Belum punya post :(
                </CText>

                {/* Guest */}
              </View>
            )}
          </View>
        </ScrollView>
        {/* User */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  profile: {
    minHeight: responsiveHeight(300),
    elevation: 15,
    backgroundColor: Colors.white,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    marginBottom: 15,
    paddingVertical: 20,
  },
  username: {
    fontSize: 25,
    color: Colors.primary,
  },
  text: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: 'normal',
    marginVertical: 5,
  },
  photoWrapper: {
    flexDirection: 'row',
    padding: 20,
  },
  photo: {
    width: responsiveWidth(50 * 2.2),
    height: responsiveHeight(60 * 2.2),
    borderRadius: 50,
  },
  guestPost: {
    alignItems: 'center',
  },
  guestPhoto: {
    backgroundColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flexDirection: 'row',
    width: '95%',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBackground: {
    backgroundColor: Colors.third,
    borderRadius: 10,
    padding: 5,
    color: Colors.primary,
  },
  btn: {
    height: responsiveHeight(60),
    borderRadius: 10,
    elevation: 0,
    alignSelf: 'center',
    marginVertical: 10,
  },
  icon: {
    width: responsiveWidth(18),
    height: responsiveWidth(20),
  },
  rateBtn: {
    width: responsiveWidth(90),
    height: responsiveHeight(50),
    borderRadius: 10,
    backgroundColor: Colors.green,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
