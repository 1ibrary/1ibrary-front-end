import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from 'react-native'
import RightButtonNav from '../../components/RightButtonNav'
import BookCollectItem from '../../components/BookCollectTitle'
import HttpUtils from '../../network/HttpUtils'
import { LISTS } from '../../network/Urls'
import { INNERWIDTH, HEIGHT } from '../../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_BOOK_COLLECT_ADD } from '../../constants/scene'
import Toast from 'antd-mobile/lib/toast'
import Storage from '../../common/storage'

const URL_SHOW = LISTS.show_list
const URL_ADD_BOOK = LISTS.collect_book
const URL_RM_LIST = LISTS.remove_list

export default class BookCollectPage extends Component {

  state = {
    bookCollectList: [],
    choosed: []
  }

  componentDidMount() {
    this.fetchBookCollects()
  }

  fetchBookCollects = async () => {
    const result = (await HttpUtils.post(URL_SHOW)) || {}
    const bookCollectLists = result.data || []
    this.setState({ bookCollectList: bookCollectLists })
  }

  rightOnPress = async () => {
    if (this.props.title === '我的书单' || this.state.choosed.length == 0) {
      Actions.pop()
      return
    }

    const tasks = []

    this.state.choosed.forEach((choosed) => {
      let {
        list_id
      } = this.state.bookCollectList.filter(list => list.list_name === choosed)[0]

      const params = {
        list_id,
        book_id: this.props.book.book_id,
        book_db_id: 1
      }

      tasks.push(HttpUtils.post(URL_ADD_BOOK, params))
    })

    const responses = await Promise.all(tasks)

    const successed = responses.every(res => res.status === 0)

    if (successed) {
      Toast.success('收藏成功！', 1)
      Actions.pop()
      return 
    }

    Toast.success('收藏失败，请重试', 1)
  }

  onPressButton = (select, item) => {
    let choosed = this.state.choosed
    if (select) {
      choosed = [...new Set([...choosed, item.list_name])]
    } else {
      choosed.splice(choosed.indexOf(item.list_name), 1)
    }
    this.setState({ choosed: choosed })
  }

  onDelete = async (title) => {
    const {
      bookCollectList
    } = this.state

    const list = bookCollectList.find(collect => collect.list_name === title)

    const params = { list_id: list.list_id }

    const result = (await HttpUtils.post(URL_RM_LIST, params)) || {}

    if (result.status !== 0) {
      Toast.offline(result.msg, 1)
      return
    }

    await this.fetchBookCollects()
    Toast.success('删除书单成功!', 1)
  }

  onConfirm = (title) => {
    Alert.alert('确认删除', '您真的要删除这个书单吗?', [
      { text: '确认', onPress: this.onDelete.bind(this, title) },
      { text: '取消' }
    ])
  }

  render() {
    return (
      <View style={styles.container}>
        <RightButtonNav title={this.props.title} rightOnPress={this.rightOnPress} />
        <TouchableOpacity
          style={styles.add}
          onPress={this.onAdd}
        >
          <Image source={require('../../../res/images/icon_add.png')} />
        </TouchableOpacity>
        <ScrollView style={styles.list}>
          {this.state.bookCollectList.map((item, i) => {
            return (
              <BookCollectItem
                item={item}
                big_title={this.props.title}
                onPress={this.onPressButton}
                onDelete={this.onConfirm}
                key={item.list_id}
                data={item}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }

  onAdd = () => {
    const params = {
      onCallBack: this.fetchBookCollects,
      bookCollectList: this.state.bookCollectList
    }
    Actions[SCENE_BOOK_COLLECT_ADD](params)
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
