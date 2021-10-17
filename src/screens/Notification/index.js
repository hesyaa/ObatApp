import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {CText, CIcon} from '../../components';
import {Colors, responsiveHeight, responsiveWidth} from '../../assets';

export class index extends Component {
  constructor() {
    super();

    this.state = {
      notifs: [
        {title: 'First Notifications !', desc: 'Hi pals, this is your first notifications. Anywat we will give you a notif here, check it oftenly!'},
      ],
    };
  }
  render() {
    const {notifs} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        {/* Header Start */}
        <View style={{padding: 10, paddingTop: 20}}>
          <CIcon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
          />
        </View>
        {/* Header End */}
        <ScrollView>
          {/* Body Start */}
          <View style={styles.container}>
            <View style={{marginHorizontal: 10}}>
              <View style={styles.headerTitle}>
                <CText
                  style={{fontSize: responsiveWidth(25), fontWeight: 'bold'}}>
                  Notification
                </CText>
                <CText
                  style={{
                    marginTop: 10,
                    fontSize: responsiveWidth(15),
                    color: 'grey',
                  }}>
                  Mark as read
                </CText>
              </View>

              <ScrollView>
                {notifs.map((value, index) => (
                  <View style={styles.contentNotif} key={index}>
                    <View style={styles.IconNotif}>
                      <Icon
                        name="bell"
                        size={responsiveWidth(30)}
                        color={Colors.primary}
                      />
                    </View>

                    <View
                      style={{
                        width: responsiveWidth(200),
                        paddingHorizontal: 5,
                      }}>
                      <CText
                        style={{
                          fontSize: responsiveWidth(20),
                          fontWeight: 'bold',
                        }}>
                        {value.title}
                      </CText>
                      <CText style={{color: Colors.grey}}>{value.desc}</CText>
                    </View>
                    <CText>Just now</CText>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
          {/* Body End */}
        </ScrollView>
      </View>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  IconNotif: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: Colors.third,
    width: responsiveWidth(68),
    height: responsiveWidth(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentNotif: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});
