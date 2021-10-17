import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ImageBackground,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Setting extends Component {
  constructor() {
    super();
    this.state = {
      button: [
        {name: 'Change Password', value: 'https'},
        {name: 'Support', value: 'person'},
        {name: 'Logout', value: 'logout'},
      ],
    };
  }
  render() {
    const {button} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 9,
                width: '10%',
              }}>
              <Icon name="chevron-left" size={35} />
            </TouchableOpacity>
            <Text style={styles.Text}>Settings</Text>
          </View>
          <Text style={styles.Text1}>Account Settings</Text>
          {button.map((value, index) => {
            return (
              <View key={index} style={styles.input3}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    height: 50,
                    justifyContent: 'space-between',
                    padding: 10,
                  }}>
                  <Icon
                    name={value.value}
                    size={30}
                    color="#4AA4FD"
                    style={{
                      borderRadius: 6,
                      backgroundColor: '#DBEDFF',
                    }}
                  />
                  <Text style={styles.Text4}>{value.name}</Text>
                  <Icon name="chevron-right" size={30} color="#4AA4FD" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  header: {
    width: '90%',
  },
  Text: {
    fontSize: 30,
    marginLeft: 90,
  },
  Text1: {
    flexDirection: 'row',
    fontSize: 20,
    color: 'grey',
    marginTop: 50,
  },
  Text2: {
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 20,
  },
  Text3: {
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 20,
  },
  Text4: {
    flexDirection: 'row',
    alignSelf: 'center',
    fontSize: 20,
  },
  input3: {
    elevation: 10,
    borderWidth: 0.1,
    backgroundColor: 'white',
    borderRadius: 20,
    marginVertical: 15,
  },
});
