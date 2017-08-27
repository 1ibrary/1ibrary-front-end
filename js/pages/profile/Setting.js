import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import CommonNav from '../../components/CommonNav'
import TextPingFang from '../../components/TextPingFang'
import SettingItem from '../../components/SettingItem'
import { Actions } from 'react-native-router-flux'
import { SCENE_LOGIN } from '../../constants/scene'

import { WIDTH, HEIGHT } from '../../common/styles'

export default class BookListPage extends Component {
  
  logout = () => {
    AsyncStorage.clear()
    Actions[SCENE_LOGIN]()
  }

  render() {
    return (
      <View style={styles.container}>
        <CommonNav title={this.props.title} />
        <View style={styles.items_container}>
          <SettingItem style={styles.item} text={'接受订阅图书消息'} />
          <SettingItem style={styles.item} text={'接受还书提醒'} />
        </View>
        <TouchableOpacity
          onPress={this.logout}
          style={styles.out}
        >
          <TextPingFang style={styles.out_font}>退出登录</TextPingFang>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center'
  },
  out: {
    width: 296,
    height: 44,
    borderRadius: 25,
    backgroundColor: '#FF7373',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80
  },
  out_font: {
    fontSize: 17,
    color: 'white'
  },
  items_container: {
    marginTop: 8
  },
  item: {
    marginBottom: 8
  }
})
