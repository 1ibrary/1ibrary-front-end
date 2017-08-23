import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native'
import RightButtonNav from '../components/RightButtonNav'
import BookCollectItem from '../components/BookCollectTitle'
import HttpUtils from '../network/HttpUtils'
import { LISTS } from '../network/Urls'
import { INNERWIDTH, HEIGHT } from '../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_BOOK_COLLECT_ADD } from '../constants/scene'
import Toast from 'antd-mobile/lib/toast'
import Storage from '../common/storage'

const URL_SHOW = LISTS.show_list
const URL_ADD_BOOK = LISTS.collect_book
const URL_RM_LIST = LISTS.remove_list

export default class BookCollectPage extends Component {

  state = {
    lists: [],
    choosed: []
  }

  async componentDidMount() {
    const result = (await HttpUtils.post(URL_SHOW)) || {}
    const lists = result.data || []
    console.log(this)
    this.setState({ lists })
  }

  rightOnPress = async () => {
    if (this.props.title === '我的书单' || this.state.choosed.length == 0) {
      Actions.pop()
    }

    const tasks = []

    this.state.choosed.forEach((choosed) => {
      let {
        list_id
      } = this.state.lists.filter(list => list.list_name === choosed)[0]

      const params = {
        list_id,
        book_id: this.props.book.book_id,
        book_db_id: 1
      }

      console.log(URL_ADD_BOOK, params)

      tasks.push(HttpUtils.post(URL_ADD_BOOK, params))
    })

    await Promise.all(tasks)

    Toast.success('收藏成功！', 1)
    Actions.pop()
  }

  onPressButton(select, item) {
    let choosed = this.state.choosed
    if (select) {
      choosed = [...new Set([...choosed, item.list_name])]
    } else {
      choosed.splice(choosed.indexOf(item.list_name), 1)
    }
    this.setState({ choosed: choosed })
  }

  async onDelete(title) {
    let array = this.state.lists
    array.some(async (d, i) => {
      if (d.list_name === title) {
        array.splice(i, 1)
      }
      let params = {
        list_id: d.list_id
      }
      let result = (await HttpUtils.post(URL_RM_LIST, params)) || {}
      if (result.msg === '请求成功') {
        await this.setState({ lists: array })
        Toast.success('删除书单成功!', 1)
        await Storage.set('book_list', array)
        return true
      } else {
        Toast.offline(result.msg, 1)
      }
    })
  }

  onConfirm(title) {
    Alert.alert('确认删除', '您真的要删除这个书单吗?', [
      { text: '确认', onPress: this.onDelete.bind(this, title) },
      { text: '取消' }
    ])
  }

  render() {
    return (
      <View style={styles.container}>
        <RightButtonNav
          title={this.props.title}
          rightOnPress={() => this.rightOnPress()}
        />
        <TouchableOpacity
          style={styles.add}
          onPress={() => {
            let params = {
              onCallBack: async () => {
                let array = await Storage.get('book_list', [])
                this.setState({ lists: array })
              }
            }
            Actions[SCENE_BOOK_COLLECT_ADD](params)
          }}
        >
          <Image source={require('../../res/images/icon_add.png')} />
        </TouchableOpacity>
        <ScrollView style={styles.list}>
          {this.state.lists.map((item, i) => {
            return (
              <BookCollectItem
                item={item}
                big_title={this.props.title}
                onPress={(select, data) => this.onPressButton(select, data)}
                onDelete={title => {
                  this.onConfirm(title)
                }}
                key={item.list_id}
                data={item}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(242,246,250)',
    height: HEIGHT
  },
  add: {
    width: INNERWIDTH,
    borderRadius: 8,
    marginLeft: 8,
    height: 48,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  list: {
    marginTop: 20
  }
})
