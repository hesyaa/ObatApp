import React, {Component} from 'react';
import {Text, View} from 'react-native';
import WebView from 'react-native-webview';

export class article extends Component {
  render() {
    const {link} = this.props.route.params;
    console.log(link);
    return (
      <WebView
        source={{uri: link, headers: {key: 'value'}}}
        onError={Event =>
          alert(`Webview Error ${Event.nativeEvent.description}`)
        }
      />
    );
  }
}

export default article;
