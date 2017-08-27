import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ListView,
  RefreshControl
} from 'react-native'
import Book from './Book'
import { HEIGHT, INNERWIDTH, getResponsiveHeight } from '../common/styles'
import { BOOKS } from '../network/Urls'

const URL = BOOKS.hot_books

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
})

export default class BookList extends Component {

  renderRow(data) {
    return <Book data={data} />
  }

  onEndReached = async () => {
    this.props.onEndReached && this.props.onEndReached()
  }
  
  render() {

    const {
      books,
      style,
      isLoading,
      onRefresh
    } = this.props

    const data = dataSource.cloneWithRows(books)

    return (
      <View style={[styles.book_list, style]}>
        <ListView
          style={styles.list}
          onEndReached={this.onEndReached}
          dataSource={data}
          onEndReachedThreshold={100}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
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
