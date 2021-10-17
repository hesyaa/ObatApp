import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {CButton, CModal, CText, RecipeCard} from '../../components';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ion from 'react-native-vector-icons/Ionicons';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {tsImportEqualsDeclaration} from '@babel/types';

export class Comment extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      comments: [],
      idpost: '',
      fieldcoment: '',
      name: '',
      totalComment: '',
      viewPage: false,
    };
  }

  componentDidMount() {
    const fire = Auth().currentUser;

    const {name, desc, id_post, id_pembuat} = this.props.route.params;

    if (fire == null) {
      alert('anda belum login');
      this.setState({
        viewPage: false,
      });
    } else {
      const dataAuth = Auth().currentUser.uid;
      firestore()
        .collection('POSTS')
        .where('IdPost', '==', id_post)
        .onSnapshot(value => {
          // let datas = []
          let datas = value.docs.map(result => {
            return result.data();
            console.log(datas);
          });
          this.setState({
            posts: datas,
            idpost: datas.IdPost,
            viewPage: true,
          });
        });

      firestore()
        .collection('Comments')
        .where('idtarget', '==', id_post)
        .onSnapshot(value => {
          // let datas = []
          let datas = value.docs.map(result => {
            return result.data();
            console.log(datas);
          });
          this.setState({
            comments: datas,
            totalComment: datas.length,
          });
        });

      firestore()
        .collection('Users')
        .where('IdUser', '==', dataAuth)
        .onSnapshot(result => {
          let datas = result.docs.map(value => {
            return value.data();
          });
          datas.map(value => {
            this.setState({
              name: value.firstname,
            });
          });
        });
    }
  }

  submit = () => {
    const {name, fieldcoment, idpost, coments, totalComment} = this.state;
    const {id_post} = this.props.route.params;

    function makeId() {
      let ID = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (var i = 0; i < 12; i++) {
        ID += `${characters.charAt(Math.floor(Math.random() * 50))}`;
      }
      return ID;
    }

    const com = {
      idcomment: makeId(),
      idtarget: id_post,
      name: this.state.name,
      comment: fieldcoment,
    };

    firestore()
      .collection('Comments')
      .add(com)
      .then(() => {
        console.log('User added!');
        Alert.alert('berhasil ditambah');
      })
      .catch(err => {
        console.log('error');
      });
    console.log(com);
  };

  render() {
    const {posts, comments, name, viewPage, totalComment} = this.state;
    console.log(totalComment);
    return (
      <View style={styles.container}>
        {viewPage ? (
          <View>
            {posts.map((value, index) => (
              <View key={index}>
                <RecipeCard
                  style={styles.card}
                  title={value.title}
                  thumbnail={value.foto}
                  desc={value.desc}
                  type={value.type}
                  name={value.name}
                  iconcomment={false}
                  total={totalComment}
                  bahan={value.bahan.map((data, index) => (
                    <View key={index} style={{}}>
                      <Text
                        style={{
                          marginHorizontal: 5,
                          marginVertical: 5,
                          fontWeight: 'bold',
                        }}>
                        {index + 1}. {data.bahan}
                      </Text>
                    </View>
                  ))}
                />
                <TextInput
                  placeholder="add new comment"
                  style={styles.inp}
                  onChangeText={text => this.setState({fieldcoment: text})}
                />
                <View
                  style={{
                    marginBottom: 5,
                    width: 320,
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}>
                  <Button title="submit" onPress={this.submit} />
                </View>
                <ScrollView>
                  {comments.map((value, index) => (
                    <View style={styles.comment} key={index}>
                      <Icon
                        name="info"
                        size={20}
                        style={{alignSelf: 'flex-end', color: 'lightblue'}}
                      />
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          marginVertical: 5,
                          color: 'green',
                        }}>
                        {value.name}
                      </Text>
                      <Text style={{color: 'grey', fontSize: 15}}>
                        {value.comment}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))}
          </View>
        ) : (
          <Text>Anda belum login</Text>
        )}
      </View>
    );
  }
}

export default Comment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  comment: {
    borderWidth: 0.5,
    width: 320,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  inp: {
    alignSelf: 'center',
    borderWidth: 0.5,
    marginTop: 5,
    backgroundColor: 'white',
    width: 320,
  },
});
