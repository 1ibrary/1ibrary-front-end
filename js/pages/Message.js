import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native'
import NavigationBar from '../components/NavigationBar'
import Message from '../components/Message'
import {HEIGHT,getResponsiveHeight} from '../common/styles'

export default class MessagePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'通知'} />
        <ScrollView style={styles.item_container}>
          <Message/>
          <Message
            data={{ title: '小王子', kind: 2 }}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: 'rgb(242,246,250)'
  },
  item_container: {
    marginTop: getResponsiveHeight(17)
  }
})
