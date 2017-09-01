import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView
} from 'react-native'
import CommonNav from '../../components/CommonNav'
import TextPingFang from '../../components/TextPingFang'
import {
  WIDTH,
  INNERWIDTH,
  HEIGHT,
  getResponsiveHeight
} from '../../common/styles'
import fetchData from '../../common/loading'
import { connect } from 'react-redux'
import { fetchRentBooks } from '../../redux/modules/rent'


function mapStateToProps (state) {
  return {
    books: state.rent.books
  }
}

@connect(mapStateToProps)
export default class MessageInfoPage extends Component {

  componentDidMount() {
    if (this.props.books.length === 0) {
      fetchData(this.fetchBorrowed)
    }
  }

  fetchBorrowed = async () => {
    await this.props.dispatch(fetchRentBooks())
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav_container}>
          <CommonNav
            title="借阅图书"
            navigator={this.props.navigator}
          />
        </View>
        {
          this.renderBooks()
        }
      </View>
    )
  }

  renderBooks = () => {
    return (
      <ScrollView>
        {
          this.props.books.map((book, i) => {
            return (
              <View style={styles.item} key={i}>
                <Image
                  style={styles.book_image}
                  source={{ uri: book.book_cover }}
                />
                <View style={styles.info}>
                  <Text style={styles.info_title} numberOfLines={3}>
                    {book.book_title}
                  </Text>
                  <TextPingFang style={styles.info_rent}>
                    借阅日期: {book.borrow_time}
                  </TextPingFang>
                  <TextPingFang style={styles.info_rent}>
                    应还日期: {book.return_time}
                  </TextPingFang>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center'
  },
  nav_container: {
    width: WIDTH,
    backgroundColor: 'white'
  },
  book_image: {
    height: 111,
    width: 74
  },
  item: {
    width: INNERWIDTH,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: getResponsiveHeight(8),
    flexDirection: 'row'
  },
  book_image: {
    marginLeft: 12,
    marginTop: 20,
    width: 74,
    height: 111
  },
  info: {
    marginLeft: 16,
    marginTop: 16
  },
  info_title: {
    fontSize: 17
  },
  info_rent: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8
  }
})
