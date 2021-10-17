import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors, responsiveHeight, responsiveWidth} from '../../assets';
import Icon from 'react-native-vector-icons/Feather';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import CButton from '../../components/CButton';
import {CIcon, CText} from '../../components';

export class index extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
    };
  }

  _submit = () => {
    const {email, password} = this.state;
    if (email !== '' && password !== '') {
      alert('berhasil');
    } else {
      alert('login gagal harap isi semua field');
    }
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
            <CText style={styles.title}>Lupa Password</CText>
            <CText style={styles.subTitle}>Silahkan masukkan email anda</CText>
          </View>
        </View>
        {/* Header End */}
        <View style={styles.form}>
          <View>
            <CText>
              Email <CText style={{color: 'red'}}>*</CText>
            </CText>
            <TextInput
              placeholderTextColor={placeholderTextColor}
              onChangeText={text => this.setState({email: text})}
              style={styles.inp}
            />
          </View>

          <CButton
            style={{alignSelf: 'center', marginTop: 10}}
            onPress={this._submit}>
            Submit
          </CButton>
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
  },
  forgot: {
    margin: 5,
    alignSelf: 'flex-end',
    color: Colors.primary,
  },
});
