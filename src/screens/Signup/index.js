import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput} from 'react-native';
import {CIcon, CText, CButton} from '../../components';
import {Colors, responsiveHeight, responsiveWidth} from '../../assets';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

export default class index extends Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      noTelp: '',
      password: '',
      viewPassword: true,
    };
  }

  _submit = () => {
    const {firstName, lastName, email, noTelp, password} = this.state;

    var regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regexphone = /^[0-9]+$/;

    if (firstName && lastName && password && email && noTelp !== '') {
      if (regexphone.test(noTelp) && regex.test(email)) {
        Auth()
          .createUserWithEmailAndPassword(email, password)
          .then(response => {
            firestore()
              .collection('Users')
              .doc(response.user.uid)
              .set({
                IdUser: response.user.uid,
                firstname: firstName,
                lastname: lastName,
                email: email,
                noTelp: noTelp,
                foto: null,
                profession: 'Profesiku',
                status: 'Ubah statusmu di Pengaturan !',
                posts: [],
                points: 0,
              })
              .catch(err => {
                console.log('error');
              });
            this.setState({
              noTelp: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            });
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
            console.error(error);
          });
      } else {
        alert('invalid email or phone number');
        return false;
      }
    } else {
      alert('please filled all form');
    }
  };

  render() {
    const {firstName, lastName, email, password, noTelp, viewPassword} =
      this.state;
    const placeholderTextColor = Colors.black;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView>
          {/* Header Start */}
          <View style={styles.header}>
            <CIcon
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-back"
            />
            <CText style={styles.title}>Daftar</CText>
            <CText style={styles.subTitle}>
              Silahkan masukan data yang valid untuk mendaftar
            </CText>
          </View>
          {/* Header End */}
          {/* Body Start */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.rowTextInputWrapper}>
              <View style={{width: responsiveWidth(170)}}>
                <CText style={{marginVertical: 5}}>
                  Nama Awal{' '}
                  <CText style={{color: 'red', marginVertical: 5}}>*</CText>
                </CText>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={placeholderTextColor}
                  onChangeText={text => this.setState({firstName: text})}
                  value={firstName}
                />
              </View>

              <View style={{width: responsiveWidth(170)}}>
                <CText style={{marginVertical: 5}}>
                  Nama Akhir{' '}
                  <CText style={{color: 'red', marginVertical: 5}}>*</CText>
                </CText>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={placeholderTextColor}
                  onChangeText={text => this.setState({lastName: text})}
                  value={lastName}
                />
              </View>
            </View>

            <View style={{width: responsiveWidth(360)}}>
              <CText style={{marginVertical: 5}}>
                harus berupa angka{' '}
                <CText style={{color: 'red', marginVertical: 5}}>*</CText>
              </CText>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={placeholderTextColor}
                onChangeText={text => this.setState({noTelp: text})}
                value={noTelp}
              />
            </View>

            <View style={{width: responsiveWidth(360)}}>
              <CText style={{marginVertical: 5}}>
                Email harus mengandung @ dan .{' '}
                <CText style={{color: 'red', marginVertical: 5}}>*</CText>
              </CText>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={placeholderTextColor}
                onChangeText={text => this.setState({email: text})}
                value={email}
              />
            </View>

            <View style={{width: responsiveWidth(360)}}>
              <CText style={{marginVertical: 5}}>
                Password{' '}
                <CText style={{color: 'red', marginVertical: 5}}>*</CText>
              </CText>
              <View
                style={{
                  ...{flexDirection: 'row', alignItems: 'center'},
                  ...styles.textInput,
                }}>
                <MI name="lock" size={responsiveWidth(30)} />
                <TextInput
                  placeholderTextColor={placeholderTextColor}
                  onChangeText={text => this.setState({password: text})}
                  secureTextEntry={viewPassword}
                  value={password}
                  style={{width: responsiveWidth(270), color: Colors.black}}
                />
                <MCI
                  name={viewPassword ? 'eye' : 'eye-outline'}
                  size={responsiveWidth(30)}
                  onPress={() => {
                    this.setState({viewPassword: !viewPassword});
                  }}
                />
              </View>
            </View>
            <CButton
              title="Submit"
              style={styles.button}
              onPress={this._submit}>
              Submit
            </CButton>
            <CText>
              Sudah punya akun?{' '}
              <CText
                style={{color: Colors.primary}}
                onPress={() => navigation.navigate('Login')}>
                Masuk
              </CText>
            </CText>
          </View>
          {/* Body End */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    margin: 20,
  },
  title: {
    fontSize: responsiveWidth(46),
    marginTop: 10,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: responsiveWidth(16),
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 16,
    color: Colors.black,
    paddingLeft: 10,
  },
  rowTextInputWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    marginTop: 30,
  },
});
