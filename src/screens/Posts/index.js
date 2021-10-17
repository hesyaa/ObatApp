import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {
  Colors,
  CommentIcon,
  responsiveHeight,
  responsiveWidth,
  convertDate,
} from '../../assets';
import {CIcon, Comment, CText} from '../../components';
import MI from 'react-native-vector-icons/MaterialIcons';
import Type from '../../components/Type';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {convertDateOnly} from '../../assets';
export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentVisible: false,
      typedContent: '',
      data: this.props.route.params,
      user: {},
      currentUser: {},
    };
  }

  componentDidMount() {
    const {IdPembuat} = this.props.route.params;
    const auth = Auth().currentUser.uid;
    firestore()
      .collection('Users')
      .doc(IdPembuat)
      .onSnapshot(res => {
        this.setState({
          user: res.data(),
        });
      });

    firestore()
      .collection('Users')
      .doc(auth)
      .onSnapshot(res => {
        this.setState({currentUser: res.data()});
      });

    const {IdPost} = this.props.route.params;
    firestore()
      .collection('Comments')
      .where('idtarget', '==', IdPost)
      .onSnapshot(value => {
        let datas = value.docs.map(result => {
          return result.data();
        });
        this.setState({comments: datas});
      });
  }

  _addComment() {
    const {currentUser, typedContent, comments} = this.state;
    const {IdPost} = this.props.route.params;
    firestore()
      .collection('Comments')
      .add({
        name: `${currentUser.firstname} ${currentUser.lastname}`,
        foto: currentUser.foto,
        comment: typedContent,
        date: convertDateOnly(new Date()),
        idtarget: IdPost,
      });
    this.setState({
      typedContent: '',
    }),
      this._showComment();
  }

  _profileClick(value) {
    const {navigation} = this.props;
    navigation.navigate('Allprofile', value);
  }

  _showComment = () => {
    const {commentVisible} = this.state;
    this.setState({commentVisible: !commentVisible});
  };

  render() {
    const {navigation} = this.props;
    const {comments, commentVisible, typedContent, data, user} = this.state;
    return (
      <View style={{backgroundColor: Colors.white, flex: 1}}>
        {user ? (
          <>
            <View style={styles.mainContainer}>
              {/* Header Start */}
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <MI size={responsiveWidth(30)} name="arrow-back" />
              </TouchableOpacity>
              <View style={styles.photoWrapper}>
                {user.foto ? (
                  <Image
                    onPress={() => {
                      this._profileClick();
                    }}
                    source={{uri: user.foto}}
                    style={styles.photo}
                  />
                ) : (
                  <MI size={responsiveWidth(30)} name="person" />
                )}
                <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                  <CText
                    onPress={() => {
                      this._profileClick(user);
                    }}
                    style={{...styles.username, ...{fontWeight: 'bold'}}}>
                    {`${user.firstname} ${user.lastname}`}
                  </CText>
                  <CText style={{...styles.username, ...styles.text}}>
                    {user.profession}
                    <CText style={styles.text}> · {data.date}</CText>
                  </CText>
                </View>
              </View>
            </View>
            {/* Header End */}
            <ScrollView>
              {/* Title Start */}
              <View style={styles.wrapper}>
                <CText style={styles.title}>{data.title}</CText>
                <Type onPress={()=>{navigation.navigate('info');}} type={data.type} />
              </View>
              {/* Title End */}

              {/* Image Start */}
              <View style={styles.wrapper}>
                <Image
                  source={{uri: data.foto}}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              {/* Image Start */}
              <View style={styles.wrapper}>
                <CText style={styles.title}>Bahan - Bahan</CText>
                {data.bahan &&
                  data.bahan.map((value, index) => {
                    return (
                      <View style={{flexDirection: 'row', paddingVertical:5}} key={index}>
                        <CText style={styles.desc}>{index + 1}. </CText>
                        <CText style={styles.desc}>{value.bahan}</CText>
                      </View>
                    );
                  })}
              </View>

              {/* Description Start */}
              <View style={styles.wrapper}>
                <CText style={styles.desc}>{data.desc}</CText>
              </View>
              {/* Description End */}

              {/* Misc Start */}
              <View style={styles.commentBody}>
                <View style={{alignItems: 'center', flex: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                      this._showComment();
                    }}>
                    <Image style={styles.icon} source={CommentIcon} />
                  </TouchableOpacity>
                  <CText>{comments.length}</CText>
                </View>
              </View>
              {/* Misc End */}
              {/* Comment Start */}
              <View style={{...styles.wrapper}}>
                {commentVisible ? (
                  comments.length >= 1 ? (
                    comments.map((value, index) => {
                      return (
                        <View key={index}>
                          <Comment
                            date={value.date}
                            userImage={value.foto}
                            name={value.name}
                            content={value.comment}
                          />
                        </View>
                      );
                    })
                  ) : (
                    <CText>Jadilah yang pertama komentar !</CText>
                  )
                ) : null}
              </View>
              {/* Comment End */}
            </ScrollView>
            {Auth().currentUser ? (
              <View style={{...{flexDirection: 'row', padding: 10}}}>
                <TextInput
                  style={{...styles.addCommentColumn}}
                  placeholderTextColor={Colors.black}
                  placeholder="Tulis Komentar..."
                  onChangeText={typing => {
                    this.setState({typedContent: typing});
                  }}
                  value={typedContent}
                />
                <TouchableOpacity
                  onPress={() => {
                    this._addComment();
                  }}
                  style={{justifyContent: 'center'}}>
                  <MCI
                    name="send-circle"
                    size={responsiveWidth(50)}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <CText style={{textAlign:'center', fontWeight:'bold'}}>Silahkan Login Untuk Comment</CText>
            )}
          </>
        ) : (
          <CText>Loading..</CText>
        )}
      </View>
    );
  }
}

export default index;
const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: responsiveHeight(100),
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: Colors.white,
    elevation: 5,
    paddingHorizontal: 20,
  },
  photo: {
    width: responsiveWidth(60),
    height: responsiveHeight(70),
    borderRadius: 50,
  },
  photoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  username: {
    color: Colors.primary,
    fontSize: responsiveWidth(16),
  },
  text: {
    fontSize: responsiveWidth(14),
  },
  title: {
    fontSize: responsiveWidth(20),
    fontWeight: 'bold',
  },
  wrapper: {
    marginHorizontal: 10,
    marginVertical: 15,
  },
  image: {
    width: responsiveWidth(390),
    height: responsiveHeight(300),
  },
  commentBody: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: responsiveHeight(100),
    elevation: 5,
  },
  addCommentColumn: {
    flexDirection: 'row',
    backgroundColor: `${Colors.grey}80`,
    width: responsiveWidth(335),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    color: Colors.black,
  },
});
