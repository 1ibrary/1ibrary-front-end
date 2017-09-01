import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import TextPingFang from './TextPingFang'
import { INNERWIDTH } from '../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_BOOK_INFO, SCENE_MESSAGE } from '../constants/scene'
import moment from 'moment'
import Storage from '../common/storage'

export const MessageTypes = {
  SUBSCRIBE: 1,
  RETURN_BOOK: 0
}

export const MessageStoragePrefix = '__Message'

export default class Message extends Component {

  state = {
    read: true
  }

  static defaultProps = {
    data: {
      kind: MessageTypes.RETURN_BOOK,
      book: {}
    }
  }

  async componentDidMount () {
    const book_id = this.props.data.book.book_id
    const read = await Storage.get(`${MessageStoragePrefix}${book_id}`, false)

    if (!read) {
      this.setState({ read: false })
    }
  }

  onPress = async () => {
    const book_id = this.props.data.book.book_id
    await Storage.set(`${MessageStoragePrefix}${book_id}`, book_id)

    this.setState({ read: true })

    if (this.props.data.kind === MessageTypes.SUBSCRIBE) {
      Actions[SCENE_BOOK_INFO]({ data: this.props.data.book })
      return
    }

    Actions[SCENE_MESSAGE]()
  }

  render() {
    
    let subscribe = require('../../res/images/icon_subscribe.png')
    let return_book = require('../../res/images/icon_return.png')
    let dot = <View style={styles.dot} />
    let subscribeTips = '可以借书啦，赶紧去借阅吧～'
    const book = this.props.data.book

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.item_container}>
          <Image
            style={styles.item_image}
            source={this.props.data.kind === MessageTypes.SUBSCRIBE ? subscribe : return_book}
          />
          <View style={styles.item_info}>
            <TextPingFang style={styles.item_info_title} numberOfLines={1}>
              《{book.book_title}》
            </TextPingFang>
            <TextPingFang style={styles.item_info_content}>
              {this.props.data.kind === MessageTypes.SUBSCRIBE ? subscribeTips : this.returnTips}
            </TextPingFang>
          </View>
          {this.state.read ? <View /> : dot}
        </View>
      </TouchableOpacity>
    )
  }

  get returnTips () {
    const book = this.props.data.book
    const returnTime = moment(book.return_time)
    const time = returnTime.diff(moment(), 'days')

    if (time > 0) {
      return `还有${time}天到期，记得还书呀～`
    }
    if (time === 0) {
      return `今天就要超期啦，记得还书呀～`
    }
    if (time < 0) {
      return `已经超期${time}天啦，记得还书呀～`
    }
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
    marginLeft: 4,
    flex: 1
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
