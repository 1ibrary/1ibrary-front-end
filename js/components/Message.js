import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ListView,
  Dimensions
} from 'react-native'
import TextPingFang from './TextPingFang'
import RentInfoPage from '../pages/profile/RentInfo'
import { INNERWIDTH } from '../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_MESSAGE } from '../constants/scene'

export const MessageTypes = {
  SUBSCRIBE: 1,
  RETURN_BOOK: 0
}

export default class Message extends Component {

  state = {
    read: false
  }

  static defaultProps = {
    data: {
      kind: 1,
      title: '平凡的世界'
    }
  }

  onPress = () => {
    this.setState({ read: true })
    let params = {
      data: {
        rent: '2017/4/2',
        return_time: '2017/5/2',
        title: '美洲小宇宙'
      }
    }
    Actions[SCENE_MESSAGE](params)
  }

  render() {
    
    let subscribe = require('../../res/images/icon_subscribe.png')
    let return_book = require('../../res/images/icon_return.png')
    let dot = <View style={styles.dot} />
    let subscribeTips = '可以借书啦，赶紧去借阅吧～'
    let returnTips = '还有3天到期，记得还书呀～'

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.item_container}>
          <Image
            style={styles.item_image}
            source={this.props.data.kind === MessageTypes.SUBSCRIBE ? subscribe : return_book}
          />
          <View style={styles.item_info}>
            <TextPingFang style={styles.item_info_title}>
              《{this.props.data.title}》
            </TextPingFang>
            <TextPingFang style={styles.item_info_content}>
              {this.props.data.kind === MessageTypes.SUBSCRIBE ? subscribeTips : returnTips}
            </TextPingFang>
          </View>
          {this.state.read ? <View /> : dot}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item_container: {
    width: INNERWIDTH,
    backgroundColor: 'white',
    height: 88,
    borderRadius: 8,
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  item_image: {
    marginLeft: 16
  },
  item_info: {
    marginLeft: 4
  },
  item_info_title: {
    fontSize: 17
  },
  item_info_content: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 8
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FF7373',
    position: 'absolute',
    top: 8,
    right: 8
  }
})
