import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import NavigationBar from '../components/NavigationBar'
import Message, { MessageTypes } from '../components/Message'
import { HEIGHT, getResponsiveHeight } from '../common/styles'
import { connect } from 'react-redux'

function mapStateToProps (state) {
  return {
    rentBooks: state.rent.books,
    subscribeBooks: state.subscribe.books
  }
}

@connect(mapStateToProps)
export default class MessagePage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title={'通知'} />
        <ScrollView style={styles.item_container}>
          {this.renderSubscribeBooks()}
        </ScrollView>
      </View>
    )
  }

  renderSubscribeBooks = () => {
    return this.subscribeBooks.map(book => {
      return <Message key={book.book_id} data={{ title: book.book_title, kind: MessageTypes.SUBSCRIBE }} />
    })
  }

  get subscribeBooks () {
    return this.props.subscribeBooks.filter(book => book.book_last_number > 0)
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: 'rgb(242,246,250)'
  },
  item_container: {
    marginTop: getResponsiveHeight(17)
  }
})
