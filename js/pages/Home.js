import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import BookList from '../components/BookList'
import SearchNav_Welcome from '../components/SearchNavHomePage'
import { HEIGHT, getResponsiveHeight } from '../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_SEARCH } from '../constants/scene'
import HttpUtils from '../network/HttpUtils'
import { BOOKS } from '../network/Urls'
import Toast from 'antd-mobile/lib/toast'

const URL = BOOKS.hot_books

export default class Home extends Component {

  state = {
    books: [],
    page: 1,
    isLoading: true
  }

  componentDidMount() {
    this.fetchHotBooks()
  }

  fetchHotBooks = async () => {
    let params = { page: 1 }

    let result
    try {
      result = (await HttpUtils.post(URL, params)) || {}
    } catch (e) {
      Toast.fail('加载失败', 1)
      this.setState({ isLoading: false })
      return
    }

    if (result.status !== 0) {
      return
    }

    this.setState({
      books: result.data,
      isLoading: false
    })
  }

  onEndReached = async () => {
    const params = { page: this.state.page + 1 }

    const result = (await HttpUtils.post(URL, params)) || {}

    const books = [...this.state.books, ...result.data]

    this.setState({
      books,
      page: this.state.page + 1
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <SearchNav_Welcome
            placeholder={'搜索'}
            onFocus={this.onFocus}
          />
          <BookList
            books={this.state.books}
            onEndReached={this.onEndReached}
            style={styles.book_list}
            isLoading={this.state.isLoading}
            onRefresh={this.fetchHotBooks}
          />
        </View>
      </View>
    )
  }

  onFocus = () => {
    Actions[SCENE_SEARCH]()
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    flexDirection: 'column',
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center',
    height: HEIGHT
  },
  book_list: {
    // 一半的输入框高度加上maginBottom
    paddingTop: getResponsiveHeight(10)
  }
})
