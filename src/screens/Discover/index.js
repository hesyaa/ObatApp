import React, {Component} from 'react';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import {Colors, Filter, responsiveHeight, responsiveWidth} from '../../assets';
import {
  CModal,
  CText,
  FeaturedCard,
  InfoCard,
  PersonCard,
  RecipeCard,
} from '../../components';
import {Batuk, Berita} from '../../assets';
import firestore from '@react-native-firebase/firestore';

export class index extends Component {
  constructor() {
    super();
    this.state = {
      feature: [
        {title: 'Gejala', source: Batuk, route: 'Symp'},
        {title: 'Berita', source: Berita, route: 'News'},
      ],
      modalButton: [
        {id: 1, name: 'Pengguna', action: 'payload', selected: false},
        {id: 2, name: 'Resep Obat', action: 'payload', selected: false},
        {id: 3, name: 'Berita', action: 'payload', selected: false},
        {id: 4, name: 'Gejala', action: 'payload', selected: false},
      ],
      visible: false,
      input: '',
      userResult: null,
      snapshotData: null,
    };
  }

  componentDidMount() {
    const {userResult, input, snapshotData} = this.state;
    firestore()
      .collection('Users')
      .onSnapshot(value => {
        let datas = value.docs.map(result => {
          return result.data();
        });
        this.setState({snapshotData: datas});
      });
  }

  _selectedButton = id => {
    this.setState(prevState => ({
      modalButton: prevState.modalButton.map(value => {
        if (value.id == id) {
          value.selected = !value.selected;
          return value;
        } else {
          return value;
        }
      }),
    }));
  };

  _filterData = input => {
    const {snapshotData} = this.state;
    if (input !== '') {
      this.setState(state => {
        return {
          userResult: snapshotData.filter(value => {
            if (
              value.firstname.toLowerCase().includes(input.toLowerCase()) !==
                undefined ||
              value.lastname.toLowerCase().includes(input.toLowerCase()) !==
                undefined
            ) {
              return value;
            }
            if (
              value.title.toLowerCase().includes(input.toLowerCase()) !==
                undefined ||
              value.desc.toLowerCase().includes(input.toLowerCase()) !==
                undefined
            ) {
              return value;
            }
          }),
        };
      });
    } else {
      this.setState({userResult: null});
    }
  };

  _filterModal = () => {
    const {visible} = this.state;
    this.setState({
      visible: !visible,
    });
  };

  render() {
    const {feature, visible, modalButton, selected, input, userResult} =
      this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        {/* Modal Start */}
        <CModal
          onPress={() => {
            this._filterModal();
          }}
          visible={visible}>
          <View style={styles.buttonWrapper}>
            {modalButton.map((value, index) => {
              return (
                <TouchableOpacity
                  style={{
                    ...styles.modalButton,
                    ...(value.selected
                      ? {backgroundColor: Colors.green}
                      : {backgroundColor: 'lightgrey'}),
                  }}
                  onPress={() => {
                    this._selectedButton(id);
                  }}
                  key={index}>
                  <CText style={{fontSize: responsiveWidth(20)}}>
                    {value.name}
                  </CText>
                </TouchableOpacity>
              );
            })}
          </View>
        </CModal>
        {/* Modal End */}

        <View style={styles.headerContainer}>
          {/* Header Start */}
          <View style={[styles.searchInput, {justifyContent: 'space-between'}]}>
            <TextInput
              placeholder="Type Something Here"
              placeholderTextColor={Colors.grey}
              style={{width: '85%', color: Colors.black}}
              onChangeText={typing => {
                this._filterData(typing);
              }}
            />
            <MI name="search" size={responsiveWidth(33)} color={Colors.black} />
          </View>
          <TouchableOpacity
            onPress={() => {
              this._filterModal();
            }}
            style={{alignSelf: 'center', flex: 0.2}}>
            <Image style={styles.filterIcon} source={Filter} />
          </TouchableOpacity>
          {/* Header End */}
        </View>
        <ScrollView>
          {/* Body Start */}
          {userResult ? (
            <View style={{marginHorizontal: 10, marginVertical: 25}}>
              <CText style={{fontSize: 16, fontWeight: 'bold'}}>Pengguna</CText>
              {userResult.map((value, index) => {
                return (
                  <View style={{marginVertical: 10}} key={index}>
                    <PersonCard
                      onPress={() => {
                        navigation.navigate('Allprofile', value);
                      }}
                      name={`${value.firstname} ${value.lastname}`}
                      rate={value.ratings}
                      profession={value.profession}
                      post={value.posts}
                      image={value.foto}
                      rating={value.points}
                    />
                  </View>
                );
              })}
              <CText style={{fontSize: 16, fontWeight: 'bold'}}>
                Postingan
              </CText>
            </View>
          ) : (
            <View style={{marginHorizontal: 10}}>
              <View style={styles.noInput}>
                <CText style={{fontWeight: 'bold'}}>
                  Ups... Tidak ada yang bisa dilihat disini
                </CText>
                <CText>Mohon ketikkan sesuatu di kolom pencarian.</CText>
              </View>
              <CText style={{fontSize: 16, fontWeight: 'bold'}}>
                Rekomendasi
              </CText>
              <View style={styles.featureView}>
                {/* Feature Start */}
                {feature.map((value, index) => {
                  return (
                    <View key={index} style={{marginLeft: 5}}>
                      <FeaturedCard
                        onPress={() => {
                          navigation.navigate(value.route);
                        }}
                        source={value.source}>
                        {value.title}
                      </FeaturedCard>
                    </View>
                  );
                })}
              </View>
              {/* Feature End */}
            </View>
          )}
          {/* Body End */}
        </ScrollView>
      </View>
    );
  }
}

export default index;
const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: Colors.white,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 16,
    flex: 0.8,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 10,
    maxHeight: responsiveHeight(100),
  },
  filterIcon: {
    height: responsiveHeight(40),
    width: responsiveWidth(40),
    alignItems: 'center',
    marginLeft: 20,
  },
  noInput: {
    alignItems: 'center',
    marginVertical: 25,
  },
  featureView: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  modalButton: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    elevation: 10,
  },
  buttonText: {
    fontSize: responsiveWidth(20),
  },
});
