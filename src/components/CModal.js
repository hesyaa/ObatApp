import React, {Component} from 'react';
import {Text, StyleSheet, View, Modal, Pressable} from 'react-native';
import {CText} from '.';
import MI from 'react-native-vector-icons/MaterialIcons';
import {responsiveHeight} from '../assets/uttils';

export class CModal extends Component {
  render() {
    const {style} = this.props;
    return (
      <View style={styles.overlay}>
        <Modal
          style={styles.modal}
          {...this.props}
          transparent={true}
          visible={this.props.visible}
          presentationStyle="overFullScreen"
          hardwareAccelerated={true}>
          <Pressable style={styles.centeredView} onPress={this.props.onPress} />
          <View style={{...styles.modalView, ...style}} {...this.props}>
            <MI
              name="close"
              size={30}
              onPress={this.props.onPress}
              style={styles.icon}
            />
            {this.props.children}
          </View>
        </Modal>
      </View>
    );
  }
}
export default CModal;
const styles = StyleSheet.create({
  centeredView: {
    opacity: 0.5,
    backgroundColor: 'black',
    width: '100%',
    flex: 1,
    flexDirection: 'column-reverse',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: responsiveHeight(400),
    maxHeight: '100%',
    width: '100%',
  },
  icon: {
    alignSelf: 'center',
  },
});
