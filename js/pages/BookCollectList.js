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
import BookItem2 from '../components/BookCollect'
import CommonNav from '../components/CommonNav'
import HttpUtils from '../network/HttpUtils'
import {LISTS} from "../network/Urls"
import {HEIGHT} from '../common/styles'
const URL = LISTS.show_detail
const URL_SHOW = LISTS.show_list
const URL_RM_BOOK = LISTS.update_list

export default class BookListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book_list: []
    }
  }

  componentDidMount() {

      HttpUtils.post(URL_SHOW, {
          token: this.props.user.token,
          uid: this.props.user.uid,
          timestamp: this.props.timestamp
      })
          .then(result => {
              // alert(result.msg);
              if (result.msg === '请求成功') {
                  let data = result.data
                  data.some((item) => {
                      if (item.list_name === this.props.title) {
                          let params = {
                              token: this.props.user.token,
                              uid: this.props.user.uid,
                              timestamp: this.props.timestamp,
                              book_list:item.book_list
                          }
                          HttpUtils.post(URL,params)
                              .then(result => {
                                  if (result.msg === '请求成功') {
                                      this.setState({
                                          book_list: result.data ? result.data : []
                                      })
                                  } else {
                                      Alert.alert('网络请求出错啦', result.msg)
                                  }
                              })
                              .catch(error => {
                                  console.log(error)
                              })
                      }
                  })
                      }
                  })

          .catch(error => {
              console.log(error)
          })

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
              d.book_list = [...new Set(d.book_list.toString().trim().split(','))]
              if (!(d.book_list instanceof Array)) return false
            }
            d.book_list.some((item2, i) => {
              alert(item2)
              // alert("item"+item2+"goal:"+item.book_id)
              if (!item2.trim()) {
                d.book_list.splice(i, 1)
                return
              }

              if (item2 == item.book_id) {
                d.book_list.splice(i, 1)
                this.setState({ book_list: result.data})
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
                    if (response.msg == '请求成功') {
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
                              alert(result.data)
                            } else {
                              Alert.alert('网络请求出错啦', response.msg)
                            }
                          })
                          .catch(error => {
                            console.log(error)
                          })
                    } else {
                      Alert.alert('网络请求出错啦', response.msg)
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }
            })
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
            return (
              <BookItem2
                key={i}
                item={item}
                user={this.props.user}
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
})
