import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  API_KEY,
  Colors,
  CoronaBanner,
  country,
  responsiveHeight,
  responsiveWidth,
} from '../../assets';
import {CText, CIcon, NewsCard} from '../../components/';

export class index extends Component {
  constructor() {
    super();
    this.state = {
      news: {},
      maxNews: 5,
    };
  }

  componentDidMount() {
    const {newsData} = this.state;
    this._loadNews();
  }

  _loadNews = async () => {
    const {maxNews, news} = this.state;
    fetch(
      `https://newsapi.org/v2/top-headlines/?country=${country}&apiKey=${API_KEY}&pageSize=${maxNews}&category=health`,
    )
      .then(response => response.json())
      .then(json => this.setState({news: json}));
  };

  _loadMore = () => {
    const {maxNews} = this.state;
    this.setState({
      maxNews: maxNews + 5,
    });
    this._loadNews();
  };

  render() {
    const {news} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView>
          <View style={styles.container}>
            {/* Header Start */}
            <View style={styles.header}>
              <CIcon
                onPress={() => {
                  navigation.goBack();
                }}
                name="arrow-back"
              />
              <CIcon
                onPress={() => {
                  navigation.navigate('Notif');
                }}
                name="notifications-none"
              />
            </View>
            {/* Header End */}

            {/* Body Start */}
            <View style={{marginHorizontal: 10}}>
              <CText style={styles.title}>News Update</CText>
              <Image
                source={CoronaBanner}
                style={styles.banner}
                resizeMode="cover"
              />

              <CText style={styles.contentHeader}>Latest News</CText>
              {news.articles ? (
                news.articles.map((value, index) => (
                  <NewsCard
                    imageSource={value.urlToImage}
                    key={index}
                    title={value.title}
                    newsSource={value.source.name}
                    newsDate={value.publishedAt}
                    onPress={() => {
                      navigation.navigate('Article', {link: value.url});
                    }}
                  />
                ))
              ) : (
                <ActivityIndicator size="large" />
              )}
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  this._loadMore();
                }}
                style={styles.loadMore}>
                <CText>Muat Lebih Banyak Berita</CText>
              </TouchableOpacity>
            </View>
          </View>
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
  header: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginTop: 20,
  },
  contentTitle: {
    fontSize: responsiveWidth(16),
    fontWeight: 'bold',
  },
  contentWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  title: {
    fontSize: responsiveWidth(30),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentHeader: {
    fontSize: responsiveWidth(25),
    fontWeight: 'bold',
    marginVertical: 10,
  },
  banner: {
    width: responsiveWidth(390),
    height: responsiveHeight(200),
    borderRadius: 20,
  },
  imageContent: {
    width: responsiveWidth(120),
    height: responsiveWidth(120),
    borderRadius: 10,
  },
  textContent: {
    width: responsiveWidth(245),
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  loadMore: {
    marginVertical: 10,
  },
});
