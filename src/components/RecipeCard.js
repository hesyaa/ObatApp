import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
} from 'react-native';
import {CText, CButton, Type} from '.';
import {
  Colors,
  CommentIcon,
  Love,
  responsiveHeight,
  responsiveWidth,
} from '../assets';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MI from 'react-native-vector-icons/MaterialIcons'
export default class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      user: null,
    };
  }

  componentDidMount() {
    const user = this.props.data
    firestore()
      .collection('Users')
      .doc(user.IdPembuat)
      .onSnapshot(res => {
        this.setState({
          user: res.data(),
        });
      });
  }

  render() {
    const {bahan, namesaya, Total, iconcomment, data, user} = this.state;
    const {navigation} = this.props;
    return (
      <TouchableOpacity {...this.props}>
        <View style={styles.mainContainer}>
          <View style={{flex: 1}}>
            <View style={styles.leftContainer}>
              <Image
                source={{
                  uri: data.foto,
                }}
                style={styles.thumbnail}
              />
              <Type type={data.type} />
            </View>
            <View style={styles.rightContainer}>
              <CText style={styles.title}>{data.title}</CText>
              <CText
                style={{color: Colors.grey, fontSize: responsiveWidth(14), height:responsiveHeight(65)}}>
                {data.desc}
              </CText>
              <Text>{data.TotalComent}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1
              }}>
              {user ? (
                <>
                  {user.foto ? (
                    <Image
                      source={{uri: `${user.foto}`}}
                      style={styles.profile}
                    />
                  ) : (
                    <View style={[styles.profile, styles.guestProfile]}>
                      <MI name="person" size={responsiveWidth(30)} />
                    </View>
                  )}
                  <View style={{paddingHorizontal: 10}}>
                    <CText style={styles.username}>{user.firstname}</CText>
                    <CText style={styles.text}>{user.profession}</CText>
                  </View>
                </>
              ) : (
                <CText>Loading...</CText>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: responsiveWidth(390),
    minHeight: responsiveHeight(400),
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 15,
    elevation: 10,
    justifyContent: 'space-around',
  },
  thumbnail: {
    width: responsiveWidth(356),
    height: responsiveHeight(200),
    marginBottom:5,
    borderRadius: 12,
  },
  rightContainer: {
    width:'100%',
    minHeight: responsiveHeight(50),
    paddingHorizontal: 12,
  },
  type: {
    textAlign: 'center',
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: Colors.green,
    marginVertical: 5,
    fontSize: 15,
    height: responsiveHeight(25),
    width: 100,
  },
  username: {
    fontSize: responsiveWidth(17),
    color: Colors.primary,
    marginTop: 10,
  },
  text: {
    fontSize: responsiveWidth(12),
    color: Colors.secondary,
  },
  readMore: {
    fontSize: responsiveWidth(14),
    color: Colors.primary,
  },
  profile: {
    width: responsiveWidth(50),
    height: responsiveHeight(60),
    borderRadius: 50,
  },
  guestProfile:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.primary
  },
  title: {
    fontSize: responsiveWidth(20),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  icon: {
    width: responsiveWidth(21),
    height: responsiveHeight(25),
    marginHorizontal: 5,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});
