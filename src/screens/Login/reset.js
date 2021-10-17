import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {CButton, CDicon, CText} from '../../components';

export class passReset extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      confirmPass: false,
    };
  }

  _passvalid = () => {
    let confirm = (this.confirmPass = !this.confirmPass);
    this.setState({
      confirmPass: confirm,
    });
  };

  render() {
    const {confirmPass} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.signBtn}>
            <Icon name="chevron-left" size={20} />
          </TouchableOpacity>
          <CText style={styles.texthead}> Reset Password </CText>
          <CText style={{color: 'grey', marginHorizontal: 8}}>
            Enter your mobile number to get reset
          </CText>
          <CText style={{color: 'grey', marginHorizontal: 8}}>
            Code on your mobile number
          </CText>

          <CText style={{marginTop: 20}}>New Password*</CText>
          <View style={styles.inp}>
            <CDicon
              name="lock"
              size={20}
              style={{marginTop: 12, marginHorizontal: 8}}
            />
            <TextInput
              secureTextEntry={confirmPass}
              style={{width: '80%'}}
              onChangeText={text => this.setState({password: text})}
            />
            <TouchableOpacity onPress={this._passvalid}>
              <CDicon
                name="eye"
                size={20}
                style={{marginRight: 8, marginTop: 12}}
              />
            </TouchableOpacity>
          </View>

          <CText style={{marginTop: 10}}>Re-Type*</CText>
          <View style={styles.inp}>
            <CDicon
              name="lock"
              size={20}
              style={{marginTop: 12, marginHorizontal: 8}}
            />
            <TextInput
              secureTextEntry={confirmPass}
              style={{width: '80%'}}
              onChangeText={text => this.setState({password: text})}
            />
            <TouchableOpacity onPress={this._passvalid}>
              <CDicon
                name="eye"
                size={20}
                style={{marginRight: 8, marginTop: 12}}
              />
            </TouchableOpacity>
          </View>
          <CButton title="reset password" />
        </View>
      </View>
    );
  }
}

export default passReset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    width: '90%',
    height: '100%',
    padding: 10,
    marginTop: 30,
  },
  texthead: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginVertical: 15,
  },
  signBtn: {
    borderWidth: 1,
    width: '10%',
    padding: 5,
    borderRadius: 8,
    borderColor: 'grey',
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  inp: {
    width: '100%',
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  icon: {marginTop: 12, marginHorizontal: 8},
});
