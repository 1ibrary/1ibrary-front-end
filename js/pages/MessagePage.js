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
import NavigationBar from '../common/NavigationBar'
import MessageItem from '../common/MessageItem'
const WIDTH = Dimensions.get('window').width
const INNERWIDTH = WIDTH - 16
const HEIGHT = Dimensions.get('window').height

export default class MessagePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'通知'} />
        <ScrollView style={styles.item_container}>
          <MessageItem navigator={this.props.navigator} />
          <MessageItem
            navigator={this.props.navigator}
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
    marginTop: 17 / 667 * HEIGHT
  }
})
