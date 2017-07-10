import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native'
import BookItem1 from '../components/Book'
import BookItem2 from '../components/BookCollect'
import CommonNav from '../components/CommonNav'
import HttpUtils from '../network/HttpUtils'
import {LISTS} from "../network/Urls"
const WIDTH = Dimensions.get('window').width
const INNERWIDTH = WIDTH - 16
const HEIGHT = Dimensions.get('window').height
const URL = LISTS.show_detail
const URL_RM_BOOK = LISTS.update_list

export default class BookListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book_list: []
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('book_list', (error, array) => {
      if (error) {
        console.log(error)
      } else {
        if (array) {
          array = JSON.parse(array)
        } else {
          array = []
        }
        array.some(d => {
          if (d.list_name && d.list_name === this.props.title) {
            let book_list = d.book_list
            // alert(JSON.stringify(books))
            // alert(this.props.title)
            if (book_list.length > 0) {
              // alert(this.props.book_list);
              book_list = book_list.toString().trim().split(',')
              book_list.map((item, i) => {
                if (!item.trim()) {
                  book_list.splice(i, 1)
                }
              })
              if (book_list.length <= 0) {
                this.setState({ book_list: [] })
                return
              }
              HttpUtils.post(URL, {
                book_list: book_list,
                uid: this.props.user.uid,
                token: this.props.user.token,
                timestamp: this.props.timestamp
              })
                .then(result => {
                  if (result.msg === '请求成功') {
                    this.setState({
                      book_list: result.data ? result.data : []
                    })
                    // alert(JSON.stringify(result.data));
                  } else {
                    Alert.alert('网络请求出错啦', result.msg)
                  }
                })
                .catch(error => {
                  console.log(error)
                })
            }
            return d.list_name === this.props.title
          }
        })
      }
    })

    // 	alert(JSON.stringify({
    // 		book_list:book_list,
    // 		uid:this.props.user.uid,
    // 		token:this.props.user.token,
    // 		timestamp:this.props.timestamp
    // }))
  }
  onDelete(item) {
    AsyncStorage.getItem('book_list', (error, array) => {
      if (error) {
        console.log(error)
      } else {
        if (array) {
          array = JSON.parse(array)
        } else {
          array = []
        }
        array.some(d => {
          if (d.list_name && d.list_name === this.props.title) {
            if (d.book_list === '[]') {
              d.book_list = []
            } else {
              d.book_list = d.book_list.toString().trim().split(',')
              if (!(d.book_list instanceof Array)) return
            }
            // alert(d.book_list)
            d.book_list.some((item2, i) => {
              // alert("item"+item2+"goal:"+item.book_id)
              if (!item2.trim()) {
                d.book_list.splice(i, 1)
                return
              }
              if (item2 == item.book_id) {
                d.book_list.splice(i, 1)
                // alert(JSON.stringify({
                // 	list_id:d.list_id,
                // 	uid:this.props.user.uid,
                // 	token:this.props.user.token,
                // 	timestamp:this.props.timestamp,
                // 	book_list:d.book_list.join(",")
                // }));
                HttpUtils.post(URL_RM_BOOK, {
                  book_list: d.book_list.join(',').trim()
                    ? d.book_list.join(',')
                    : '[]',
                  list_id: d.list_id,
                  uid: this.props.user.uid,
                  token: this.props.user.token,
                  timestamp: this.props.timestamp
                })
                  .then(response => {
                    if (response.msg === '请求成功') {
                      if (d.book_list.length > 0) {
                        HttpUtils.post(URL, {
                          book_list: d.book_list.join(',')
                            ? d.book_list.join(',')
                            : null,
                          uid: this.props.user.uid,
                          token: this.props.user.token,
                          timestamp: this.props.timestamp
                        })
                          .then(result => {
                            if (result.msg === '请求成功') {
                              this.setState({ book_list: [] }, () => {
                                this.setState({ book_list: result.data })
                              })
                              // alert(JSON.st            ringify(result.data));
                            } else {
                              Alert.alert('网络请求出错啦', response.msg)
                            }
                          })
                          .catch(error => {
                            console.log(error)
                          })
                      } else {
                        this.setState({ book_list: [] })
                      }
                    } else {
                      Alert.alert('网络请求出错啦', response.msg)
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  })

                return true
              }
            })

            return d.list_name === this.props.title
          }
        })
      }
      AsyncStorage.setItem('book_list', JSON.stringify(array), error => {
        if (error) {
          console.log(error)
        } else {
        }
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <CommonNav
          navigator={this.props.navigator}
          title={this.props.title ? this.props.title : '书单'}
        />
        <ScrollView style={styles.item_container}>
          {this.state.book_list.map((item, i) => {
            // alert(item);
            return (
              <BookItem2
                key={i}
                item={item}
                user={this.props.user}
                navigator={this.props.navigator}
                onDelete={(item, i) => {
                  this.onDelete(item)
                }}
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
    height: HEIGHT,
    backgroundColor: 'rgb(242,246,250)'
  },
  item_container: {
    marginTop: 8
  },
  item: {
    // marginLeft:8
  }
})
