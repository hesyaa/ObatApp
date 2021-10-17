import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ToastAndroid,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Colors, responsiveHeight, responsiveWidth} from '../../assets';
import {CIcon, CText, CButton} from '../../components';
import Auth from '@react-native-firebase/auth';
import MI from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      userData: null,
    };
  }

  componentDidMount = async () => {
    const fire = await Auth().currentUser;
    if (fire !== null) {
      firestore()
        .collection('Users')
        .doc(fire.uid)
        .onSnapshot(response => {
          this.setState({userData: [response.data()]});
        });
    }
  };

  _changePhotoProfile = async () => {
    const user = await Auth().currentUser.uid;

    ImagePicker.openPicker({
      width: responsiveWidth(300),
      height: responsiveHeight(400),
      cropping: true,
    })
      .then(image => {
        this._upload(image, user);
      })
      .catch(e => {
        ToastAndroid.show('Image does not Changed', ToastAndroid.SHORT);
      });
  };

  _upload = async (image, user) => {
    let fileName = image.path.substring(image.path.lastIndexOf('/') + 1);
    await storage()
      .ref(`Photo/profile/${user}/${fileName}`)
      .putFile(image.path);
    await storage()
      .ref(`Photo/profile/${user}/${fileName}`)
      .getDownloadURL()
      .then(downloadUrl => {
        firestore().collection('Users').doc(`${user}`).update({
          foto: downloadUrl,
        });
      });
  };

  _submitData = async () => {
    const {profession, status, userData} = this.state;
    if (userData !== null) {
      if (status !== null && profession !== null) {
        userData.map(val => {
          firestore()
            .collection('Users')
            .doc(val.IdUser)
            .update({
              profession: profession,
              status: status,
            })
            .catch(e => {
              if (e == null) {
                ToastAndroid.show(`${e}`, ToastAndroid.SHORT);
              }
            });
          ToastAndroid.show('Data Updated', ToastAndroid.SHORT);
        });
      } else if (status == null) {
        userData.map(val => {
          firestore()
            .collection('Users')
            .doc(val.IdUser)
            .update({
              profession: val.profession,
              status: status,
            })
            .catch(e => {
              if (e == null) {
                ToastAndroid.show(`${e}`, ToastAndroid.SHORT);
              }
            });
          ToastAndroid.show('Data Updated', ToastAndroid.SHORT);
        });
      } else if (profession == null) {
        userData.map(val => {
          firestore()
            .collection('Users')
            .doc(val.IdUser)
            .update({
              profession: val.profession,
              status:status,
            })
            .catch(e => {
              if (e == null) {
                ToastAndroid.show(`${e}`, ToastAndroid.SHORT);
              }
            });
          ToastAndroid.show('Data Updated', ToastAndroid.SHORT);
        });
      } else {
        ToastAndroid.show('Please Insert Data', ToastAndroid.SHORT);
      }
    }
  };

  render() {
    const {navigation, route} = this.props;
    const {userData, profession, status} = this.state;
    const placeholderTextColor = Colors.black;
    return (
      <View style={{flex: 1}}>
        {/* Header Start  */}
        <View style={styles.header}>
          <CIcon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
          />
          <View>
            <CText style={styles.title}>{route.params.screenName}</CText>
          </View>
        </View>
        {/* Header End */}
        <ScrollView>
          {/* Edit Profile Start */}
          <View style={{marginVertical: 20, justifyContent: 'center'}}>
            {userData ? (
              userData.map((value, index) => {
                return (
                  <View key={index} style={{alignItems: 'center'}}>
                    {/* Preview Start */}
                    <View style={styles.photoWrapper}>
                      <View style={{alignItems: 'center'}}>
                        {value.foto ? (
                          <Image
                            source={{uri: value.foto}}
                            style={styles.photo}
                          />
                        ) : (
                          <View style={[styles.photo, styles.guestPhoto]}>
                            <MI name="person" size={responsiveWidth(60)} />
                          </View>
                        )}
                        <CButton
                          textStyle={styles.title}
                          onPress={() => {
                            this._changePhotoProfile();
                          }}
                          style={styles.editButton}>
                          Ganti
                        </CButton>
                      </View>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          width: responsiveWidth(235),
                        }}>
                        <CText
                          style={
                            styles.username
                          }>{`${value.firstname} ${value.lastname}`}</CText>
                        <CText style={styles.text}>{value.profession}</CText>
                        <CText style={{fontSize: 16}}>{value.status}</CText>
                      </View>
                    </View>
                    {/* Preview End */}

                    <View style={{width: responsiveWidth(360)}}>
                      <CText style={{marginVertical: 5}}>
                        Status{' '}
                        <CText style={{color: 'red', marginVertical: 5}}>
                          Maksimal 30 karakter
                        </CText>
                      </CText>
                      <TextInput
                        style={styles.textInput}
                        placeholderTextColor={placeholderTextColor}
                        onChangeText={text => this.setState({status: text})}
                        placeholder={value.status}
                      />
                    </View>

                    <View style={{width: responsiveWidth(360)}}>
                      <CText style={{marginVertical: 5}}>
                        Profesi{' '}
                        <CText style={{color: 'red', marginVertical: 5}}>
                          *
                        </CText>
                      </CText>
                      <TextInput
                        style={styles.textInput}
                        placeholderTextColor={placeholderTextColor}
                        onChangeText={text => this.setState({profession: text})}
                        placeholder={value.profession}
                      />
                    </View>

                    <CButton
                      title="Submit"
                      style={{marginVertical: 20}}
                      onPress={() => {
                        this._submitData();
                      }}>
                      Submit
                    </CButton>
                  </View>
                );
              })
            ) : (
              <View style={{alignItems: 'center', margin: 20}}>
                <ActivityIndicator size="large" />
                <CText>Loading Data</CText>
              </View>
            )}
          </View>
          {/* Edit Profile End */}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userSignup,
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
  header: {
    width: '100%',
    height: responsiveHeight(100),
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  title: {
    fontSize: responsiveWidth(16),
    paddingHorizontal: 20,
  },
  profile: {
    height: responsiveHeight(270),
    elevation: 15,
    backgroundColor: Colors.white,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
    marginBottom: 15,
  },
  username: {
    fontSize: 18,
    color: Colors.primary,
  },
  text: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: 'normal',
  },
  photoWrapper: {
    flexDirection: 'row',
    padding: 20,
  },
  photo: {
    width: responsiveWidth(50 * 2.2),
    height: responsiveHeight(60 * 2.2),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestPhoto: {
    backgroundColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    width: responsiveWidth(100),
    height: responsiveHeight(50),
    borderRadius: 10,
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 16,
    color: Colors.black,
    paddingLeft: 10,
  },
});
