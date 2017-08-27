import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import BookList from '../components/BookList'
import { HEIGHT, getResponsiveHeight } from '../common/styles'
import { Actions } from 'react-native-router-flux'
import HttpUtils from '../network/HttpUtils'
import { SUBSCRIBE } from '../network/Urls'
import Toast from 'antd-mobile/lib/toast'
import CommonNav from '../components/CommonNav'

const URL = SUBSCRIBE.get_subscribe

export default class Subscribe extends Component {

  state = {
    books: [],
    isLoading: true
  }

  componentDidMount() {
    this.fetchSubscribeBooks()
  }

  fetchSubscribeBooks = async () => {
    let result
    try {
      result = await HttpUtils.post(URL, {})
    } catch (e) {
      Toast.fail('加载失败', 1)
      this.setState({ isLoading: false })
      return
    }

    if (result.status !== 0) {
      return
    }

    this.setState({
      books: result.books,
      isLoading: false
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <CommonNav
          title="订阅图书"
          navigator={this.props.navigator}
        />
        <BookList
          books={this.state.books}
          onEndReached={this.onEndReached}

          isLoading={this.state.isLoading}
          onRefresh={this.fetchSubscribeBooks}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center',
    height: HEIGHT
  }
})
