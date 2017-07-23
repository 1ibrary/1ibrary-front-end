import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ListView,
  Dimensions,
  RefreshControl
} from 'react-native'
import Book from './Book'
import HttpUtils from '../network/HttpUtils'
import {HEIGHT,INNERWIDTH, getResponsiveHeight} from '../common/styles'
import {BOOKS} from "../network/Urls"


const URL = BOOKS.show_books

export default class BookList extends Component {
  constructor(props) {
    super(props)

    let data = this.props.books_data ? this.props.books_data : []
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      isLoading: true,
      page: 1,
      books: []
    }
  }
  componentDidMount() {
    this.onLoad()
  }
  async onLoad() {
    let params = {
        uid: this.props.user.uid,
        token: this.props.user.token,
        timestamp: this.props.timestamp,
        page: 1
    }
    let result = await HttpUtils.post(URL, params) || {}
    if (result.msg === '请求成功') {
      this.setState({ books: result.data }, () => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.books),
          page: 1
        })
      })
      this.setState({ isLoading: false })
    }
  }
  async onEndReached() {
    let params = {
        uid: this.props.user.uid,
        token: this.props.user.token,
        timestamp: new Date().getTime(),
        page: this.state.page + 1
    }
    let result = await HttpUtils.post(URL, params) || {}
    this.setState(
      {
        books: [...this.state.books, ...result.data]
      },
      () => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.books),
          page: this.state.page + 1
        })
      }
    )
  }
  renderRow(data) {
    return (
      <Book
        timestamp={this.props.timestamp}
        user={this.props.user}
        navigator={this.props.navigator}
        data={data}
      />
    )
  }
  render() {
    return (
      <View style={[styles.book_list, this.props.style]}>
        <ListView
          style={styles.list}
          onEndReached={() => {
            this.onEndReached()
          }}
          dataSource={this.state.dataSource}
          onEndReachedThreshold={0}
          renderRow={data => this.renderRow(data)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.onLoad()
              }}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  book_list: {
    flex: 1,
    width: INNERWIDTH,
    paddingBottom: getResponsiveHeight(44)
  },
  list: {
    height: HEIGHT
  }
})
