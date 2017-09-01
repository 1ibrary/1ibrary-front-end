import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import BookList from '../components/BookList'
import { HEIGHT } from '../common/styles'
import CommonNav from '../components/CommonNav'
import { connect } from 'react-redux'
import { fetchSubscribe } from '../redux/modules/subscribe'

function mapStateToProps (state) {
  return {
    books: state.subscribe.books
  }
}

@connect(mapStateToProps)
export default class Subscribe extends Component {

  state = {
    books: [],
    isLoading: false
  }

  componentDidMount() {
    this.fetchSubscribeBooks()
  }

  fetchSubscribeBooks = () => {
    this.props.dispatch(fetchSubscribe())
  }

  render () {
    return (
      <View style={styles.container}>
        <CommonNav
          title="订阅图书"
          navigator={this.props.navigator}
        />
        <BookList
          books={this.props.books}
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
