import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Text,
  Button,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  AddImage,
  Colors,
  convertDateOnly,
  responsiveHeight,
  responsiveWidth,
} from '../../assets';
import {CText, CIcon, CButton} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

export class index extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      kategori: '',
      desc: '',
      bahan: '',
      valuefields: [],
      fields: [],
      Username: '',
      component: true,
      foto: null,
    };
  }

  componentDidMount() {
    const dataAuth = Auth().currentUser;
    const {component} = this.state;

    if (dataAuth !== null) {
      this.setState({
        component: true,
      });
    } else {
      this.setState({
        component: false,
      });
    }
  }

  addRecipe = () => {
    const {fields, bahan, valuefields} = this.state;
    const newFields = {bahan: bahan};
    const data = valuefields.push(newFields);
    this.setState({
      data,
    });
  };

  _submit = async () => {
    const dataAuth = Auth().currentUser.uid;
    const {bahan, valuefields, Username, fields, desc, kategori, title, foto} =
      this.state;
    const data = valuefields;
    let gabungan = [...data, {bahan: bahan}];
    if (foto !== null) {
      let fileName = foto.substring(foto.lastIndexOf('/') + 1);
      await storage().ref(`Photo/Posts/${dataAuth}/${fileName}`).putFile(foto);
      await storage()
        .ref(`Photo/Posts/${dataAuth}/${fileName}`)
        .getDownloadURL()
        .then(downloadUrl => {
          function makeId() {
            let ID = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (var i = 0; i < 12; i++) {
              ID += characters.charAt(Math.floor(Math.random() * 50));
            }
            return ID;
          }
          firestore()
            .collection('Users')
            .doc(dataAuth)
            .onSnapshot(documentSnapshot => {
              this.setState({
                Username: documentSnapshot.data().firstname,
              });
            });

          const maindata = {
            IdPost: makeId(),
            IdPembuat: dataAuth,
            title: title,
            type: kategori,
            desc: desc,
            foto: foto ? downloadUrl : null,
            bahan: gabungan,
            comments: [],
            name: Username,
            date:convertDateOnly(new Date())
          };

          firestore()
            .doc(`POSTS/${maindata.IdPost}`)
            .set(maindata)
            .then(() => {
              ToastAndroid.show('post berhasil ditambah', ToastAndroid.SHORT);
            })
            .catch(err => {
              ToastAndroid.show(`${err}`, ToastAndroid.SHORT);
            });
        });
    }
  };

  _addImage() {
    ImagePicker.openPicker({
      cropping: true,
      mediaType:'photo'
    })
      .then(image => {
        this.setState({foto: image.path});
      })
      .catch(e => {
        ToastAndroid.show('Image does not Changed', ToastAndroid.SHORT);
      });
  }

  render() {
    const placeHolderColor = Colors.black;
    const selectedColor = Colors.primary;
    const {
      valuefields,
      fields,
      bahan,
      desc,
      title,
      kategori,
      com,
      component,
      foto,
    } = this.state;
    return (
      <View style={styles.container}>
        {/* Header Start */}
        {component ? (
          <View>
            <ScrollView>
              {/* Body Start */}
              <View>
                {foto && (
                  <Image
                    style={styles.imagePreview}
                    source={{
                      uri: foto,
                    }}
                  />
                )}
              </View>

              <TextInput
                placeholderTextColor={placeHolderColor}
                style={styles.recipe}
                placeholder="Judul Resep"
                selectionColor={selectedColor}
                onChangeText={text => this.setState({title: text})}
              />
              <TextInput
                placeholderTextColor={placeHolderColor}
                style={styles.recipe}
                placeholder="Kategori e.g Ringan/Sedang/Keras"
                selectionColor={selectedColor}
                onChangeText={text => this.setState({kategori: text})}
              />
              <TextInput
                placeholder="bahan"
                onChangeText={text => this.setState({bahan: text})}
                style={styles.addRecipe}
                placeholderTextColor={placeHolderColor}
              />
              {valuefields.map((value, index) => (
                <View key={index}>
                  <TextInput
                    placeholder={value.bahan}
                    onChangeText={text => this.setState({bahan: text})}
                    style={styles.addRecipe}
                    placeholderTextColor={placeHolderColor}
                  />
                </View>
              ))}
              <TouchableOpacity style={styles.addBtn} onPress={this.addRecipe}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Add bahan
                </Text>
              </TouchableOpacity>
              <TextInput
                placeholderTextColor={placeHolderColor}
                style={styles.description}
                placeholder="Keterangan"
                selectionColor={selectedColor}
                textAlignVertical="top"
                multiline={true}
                onChangeText={text => this.setState({desc: text})}
              />

              <TouchableOpacity
                onPress={() => {
                  this._addImage();
                }}
                style={styles.addPhoto}>
                <Image source={AddImage} resizeMode="cover" />
              </TouchableOpacity>

              <CButton
                onPress={() => {
                  this._submit();
                }}
                style={{alignSelf: 'center', marginVertical: 10}}>
                Unggah
              </CButton>
              {/* <View
                style={{marginBottom: 20, width: '80%', alignSelf: 'center'}}>
                <Button title="submit" onPress={this._submit} />
              </View> */}
              {/* Body End */}
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{marginVertical: 10}}>Sudah punya account ?</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  padding: 10,
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text>Belum punya account ?</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={{color: 'blue', marginHorizontal: 5}}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* Header End */}
      </View>
    );
  }
}

export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    alignItems: 'center',
    marginVertical: 10,
  },
  recipe: {
    marginHorizontal: '10%',
    color: Colors.black,
  },
  description: {
    height: 150,
    width: '80%',
    borderWidth: 1,
    marginHorizontal: '10%',
    marginTop: 20,
    color: Colors.black,
    borderRadius: 20,
    paddingLeft: 10,
  },
  addPhoto: {
    backgroundColor: Colors.primary,
    height: responsiveWidth(100),
    width: responsiveWidth(100),
    marginHorizontal: '10%',
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    backgroundColor: Colors.primary,
    padding: 10,
    marginVertical: 10,
    width: '40%',
    alignSelf: 'center',
  },
  addRecipe: {
    borderBottomWidth: 0.5,
    width: '80%',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    color: Colors.black,
  },
  addPhoto: {
    backgroundColor: Colors.primary,
    height: responsiveWidth(100),
    width: responsiveWidth(100),
    marginHorizontal: '10%',
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    color: '#D1E6E9',
    fontSize: 20,
  },
  imagePreview: {
    width: '90%',
    height: responsiveHeight(250),
    margin: 20,
    borderRadius: 20,
  },
});
