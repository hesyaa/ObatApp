import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Text,
  Alert,
} from 'react-native';
import {
  Colors,
  responsiveHeight,
  responsiveWidth,
  StarActive,
  Nurse,
  Sad,
} from '../../assets/';
import {CButton, CModal, CText, RecipeCard} from '../../components';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Post} from '..';
export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      menuList: [{name: 'Support', icon: 'support', route: 'Support'}],
      data: null,
      rate: false,
      posts: [],
      deleteIcon: true,
    };
  }

  async componentDidMount() {
    const fire = await Auth().currentUser;
    const dataAuth = Auth().currentUser.uid;
    const {posts} = this.state;
    console.log(posts);
    if (this.props.route.params !== undefined) {
      console.log(this.props.route.params);
    } else {
      firestore()
        .collection('Users')
        .doc(fire.uid)
        .onSnapshot(response => {
          this.setState({data: [response.data()]});
        });

      firestore()
        .collection('POSTS')
        .where('IdPembuat', '==', fire.uid)
        .onSnapshot(value => {
          let datas = value.docs.map(result => {
            return result.data();
          });
          this.setState({
            posts: datas,
          });
        });
    }
  }

  _remove = index => {
    Alert.alert(
      'Hapus data',
      'Apakah yakin ingin menghapus post ini',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            firestore()
              .collection('POSTS')
              .doc(index)
              .delete()
              .then(() => {
                Alert.alert('user deleted');
              }),
        },
      ],
      {cancelable: false},
    );
  };

  _modalView = () => {
    const {visible} = this.state;
    this.setState({
      visible: !visible,
    });
  };

  _logout() {
    const {navigation} = this.props;
    Auth()
      .signOut()
      .then(() => ToastAndroid.show('Signed Out', ToastAndroid.SHORT));
    navigation.replace('Splash');
  }

  _rate() {
    const {rate} = this.state;
    // this.setState({
    //   rate: !rate,
    // });
    Alert.alert('Anda tidak bisa rate profil sendiri');
  }

  render() {
    const {visible, menuList, data, rate, posts, deleteIcon} = this.state;
    const {navigation} = this.props;
    const auth = Auth().currentUser;
    if (auth !== null) {
      posts &&
        firestore()
          .collection('Users')
          .doc(auth.uid)
          .update({posts: posts.length});
    }
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        {/* Modal Settings */}
        <CModal
          visible={visible}
          onPress={() => {
            this._modalView();
          }}>
          {menuList.map((value, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate(value.route);
                }}
                style={styles.modalContainer}>
                <Icon
                  style={styles.iconBackground}
                  name={value.icon}
                  size={responsiveWidth(30)}
                />
                <CText style={{fontSize: responsiveWidth(20)}}>
                  {value.name}
                </CText>
                <Icon
                  name="keyboard-arrow-right"
                  size={responsiveWidth(50)}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            );
          })}

          {data ? (
            <TouchableOpacity
              onPress={() => {
                this._logout();
              }}
              style={styles.modalContainer}>
              <Icon
                style={{...styles.iconBackground, ...{color: 'red'}}}
                name="logout"
                size={responsiveWidth(30)}
              />
              <CText style={{fontSize: responsiveWidth(18)}}>Logout</CText>
              <Icon
                name="keyboard-arrow-right"
                size={responsiveWidth(50)}
                color={Colors.primary}
              />
            </TouchableOpacity>
          ) : null}
        </CModal>
        {/* Modal Settings */}

        <ScrollView>
          <View
            style={{
              ...styles.profile,
              ...(data ? {height: responsiveHeight(320)} : styles.profile),
            }}>
            {data ? (
              data.map((value, index) => {
                return (
                  <View key={index}>
                    {/* Profile Header */}

                    {/* User */}
                    <View style={styles.photoWrapper}>
                      {value.foto ? (
                        <Image
                          source={{uri: value.foto}}
                          style={styles.photo}
                        />
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
                          }>{`${value.firstname} ${value.lastname}`}</CText>
                        <CText style={styles.text}>{value.profession}</CText>
                        <CText style={{fontSize: 16}}>{value.status}</CText>
                      </View>

                      <View>
                        <MI
                          onPress={() => {
                            this._modalView();
                          }}
                          name="dots-vertical"
                          size={responsiveWidth(35)}
                        />
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
                          <CText>{data.points ? data.points : 0} (Pts)</CText>
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
                      {Auth().currentUser.uid ? (
                        <CButton
                          onPress={() => {
                            navigation.navigate('Universal', {
                              screenName: 'Edit Profil',
                              uid: data[0].IdUser,
                            });
                          }}
                          style={styles.btn}
                          textStyle={{
                            ...styles.text,
                            ...{color: Colors.white},
                          }}>
                          Edit Profil
                        </CButton>
                      ) : (
                        <CButton
                          onPress={() => {
                            navigation.navigate('Universal', {
                              screenName: 'Edit Profil',
                              data: data,
                            });
                          }}
                          style={styles.btn}
                          textStyle={{
                            ...styles.text,
                            ...{color: Colors.white},
                          }}>
                          Message
                        </CButton>
                      )}
                    </View>
                    {/* User */}
                  </View>
                );
              })
            ) : (
              <View>
                {/* Guest */}
                <View style={styles.photoWrapper}>
                  <View style={[styles.photo, styles.guestPhoto]}>
                    <Icon name="person" size={responsiveWidth(60)} />
                  </View>
                  <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                    <CText style={styles.username}>Guest</CText>
                    <CText style={styles.text}>Tunjukan bidangmu</CText>
                  </View>
                  <View>
                    <MI
                      onPress={() => {
                        this._modalView();
                      }}
                      name="dots-vertical"
                      size={responsiveWidth(35)}
                    />
                  </View>
                </View>

                {/* Guest */}
              </View>
            )}
          </View>

          {/* Profile Header */}

          <View style={{marginVertical: 10, alignItems: 'center'}}>
            {data ? (
              posts.length >= 0 ? (
                <View
                  style={{
                    marginHorizontal: 10,
                    marginBottom: responsiveHeight(120),
                  }}>
                  {posts &&
                    posts.map((value, index) => (
                      <View style={{marginVertical: 10}} key={index}>
                        <RecipeCard
                          data={value}
                          onPress={() => {
                            navigation.navigate('PostScreen', value);
                          }}
                        />
                      </View>
                    ))}
                </View>
              ) : (
                <View style={styles.guestPost}>
                  {/* Guest */}
                  <Image
                    style={{
                      maxWidth: responsiveWidth(100),
                      maxHeight: responsiveWidth(100),
                    }}
                    source={Sad}
                  />
                  <CText style={{fontSize: 16, paddingVertical: 20}}>
                    Yha kamu belum punya post :(
                  </CText>

                  {/* Guest */}
                </View>
              )
            ) : (
              <View style={styles.guestPost}>
                {/* Guest */}
                <Image
                  style={{
                    maxWidth: responsiveWidth(150),
                    maxHeight: responsiveWidth(150),
                  }}
                  source={Nurse}
                />
                <CText style={{fontSize: 16, paddingVertical: 20}}>
                  Masuk dan segera Berbagi
                </CText>
                <CButton
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  Login
                </CButton>
                <CText style={{marginVertical: 10, fontSize: 16}}>
                  Atau{' '}
                  <CText
                    style={{color: Colors.primary, fontSize: 16}}
                    onPress={() => {
                      navigation.navigate('Signup');
                    }}>
                    Daftar
                  </CText>
                </CText>
                {/* Guest */}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
    userSignup: state.userSignup,
  };
};
const mapDispatchToProps = send => {
  return {
    Signup: data =>
      send({
        type: 'SIGNUP-ACCOUNT',
        payload: data,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
  profile: {
    height: responsiveHeight(300),
    elevation: 15,
    backgroundColor: Colors.white,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    marginBottom: 15,
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
