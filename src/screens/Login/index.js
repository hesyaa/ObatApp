import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Colors, responsiveHeight, responsiveWidth} from '../../assets';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import CButton from '../../components/CButton';
import {CIcon, CText} from '../../components';
import auth from '@react-native-firebase/auth';
export class index extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPass: false,
      visible: true,
    };
  }

  _submit = async () => {
    const {email, password} = this.state;
    const check = await auth();
    if (email !== '' && password !== '') {
      check
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          ToastAndroid.show(
            `Welcome, ${check.currentUser.email}`,
            ToastAndroid.SHORT,
          );
          this.props.navigation.replace('MainApp');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            ToastAndroid('user not found', ToastAndroid.SHORT);
          } else if (error.code === 'auth/wrong-password') {
            ToastAndroid('wrong password', ToastAndroid.SHORT);
          } else if (error.code === 'auth/invalid-email') {
            ToastAndroid('email invalid', ToastAndroid.SHORT);
          }
        });
    } else {
      ToastAndroid('login gagal harap isi semua field', ToastAndroid.SHORT);
    }
  };

  _passvalid = () => {
    let confirm = (this.confirmPass = !this.confirmPass);
    this.setState({
      confirmPass: confirm,
    });
  };

  render() {
    const {navigation} = this.props;
    const placeholderTextColor = Colors.black;
    const {visible} = this.state;
    return (
      <View style={styles.container}>
        {/* Header Start */}
        <View style={styles.header}>
          <View>
            <CIcon
              onPress={() => {
                navigation.goBack();
              }}
              name="arrow-back"
            />
            <CText style={styles.title}>Masuk</CText>
            <CText style={styles.subTitle}>
              Silahkan masuk ke akun yang telah terdaftar
            </CText>
          </View>
        </View>
        {/* Header End */}
        <View style={styles.form}>
          <View>
            <CText style={{marginVertical: 5}}>
              Email <CText style={{color: 'red'}}>*</CText>
            </CText>
            <TextInput
              placeholderTextColor={placeholderTextColor}
              onChangeText={text => this.setState({email: text})}
              style={styles.inp}
            />
          </View>

          <View>
            <CText style={{marginVertical: 5}}>
              Password <CText style={{color: 'red'}}>*</CText>
            </CText>
            <View style={styles.inp}>
              <MI
                name="lock"
                size={responsiveWidth(30)}
                style={{marginHorizontal: 5}}
              />
              <TextInput
                placeholderTextColor={placeholderTextColor}
                onChangeText={text => this.setState({password: text})}
                style={{width: responsiveWidth(250), color: Colors.black}}
                secureTextEntry={visible}
              />
              <MCI
                name={visible ? 'eye' : 'eye-outline'}
                size={responsiveWidth(30)}
                style={{marginHorizontal: 10}}
                onPress={() => {
                  this.setState({visible: !visible});
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Forget')}>
            <CText style={styles.forgot}>Lupa Password</CText>
          </TouchableOpacity>

          <CButton
            style={{alignSelf: 'center', marginTop: 10}}
            onPress={this._submit}>
            Masuk
          </CButton>
          <CText style={{alignSelf: 'center', marginVertical: 10}}>
            Belum punya Akun?{' '}
            <CText
              onPress={() => {
                navigation.navigate('Signup');
              }}
              style={{color: Colors.primary, fontWeight: 'bold'}}>
              Daftar
            </CText>
          </CText>
        </View>
      </View>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: responsiveWidth(46),
    marginTop: 10,
    fontWeight: 'bold',
  },
  header: {
    margin: 20,
  },
  form: {
    marginHorizontal: 20,
  },
  subTitle: {
    fontSize: responsiveWidth(16),
    marginBottom: 10,
  },
  inp: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: Colors.grey,
    borderRadius: 10,
    flexDirection: 'row',
    color: Colors.black,
    alignItems: 'center',
    paddingLeft:10
  },
  forgot: {
    margin: 5,
    alignSelf: 'flex-end',
    color: Colors.primary,
  },
});
