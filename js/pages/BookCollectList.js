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
const URL_SHOW = LISTS.show_detail
const URL_RM_BOOK = LISTS.update_list

export default class BookListPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
          book_list:[],
          book_id_list:""
    }
  }

  componentDidMount() {
      if(this.state.book_id_list.length==0) {
          this.getNewData(this.props.item.book_list)
      } else {
          this.getNewData(this.state.book_id_list)
      }

  }
  getNewData(book_id_list) {
      // alert(book_id_list)
      let params =  {
          token: this.props.user.token,
          uid: this.props.user.uid,
          timestamp: this.props.timestamp,
          book_list:book_id_list||"0"
      }
      // alert(JSON.stringify(params))
      HttpUtils.post(URL_SHOW,params)
          .then(result => {
              if (result.msg === '请求成功') {
                  let data = result.data
                  this.setState({book_list:data,book_id_list:book_id_list})
              }
          })

          .catch(error => {
              console.log(error)
          })
  }
  onDelete(item) {
    this.state.book_list.map((book,i)=> {
        if (book.book_id == item.book_id) {
            let list = this.props.item
            let book_id_list = this.state.book_id_list.split(",").slice(0)
            let index = book_id_list.indexOf(book.book_id + "")
            book_id_list.splice(index, 1)
            // alert(book_list)
            let params = {
                book_list: book_id_list.join(",") || "0",
                list_id: list.list_id,
                uid: this.props.user.uid,
                token: this.props.user.token,
                timestamp: this.props.timestamp
            }
            // alert("remove"+JSON.stringify(params))


            HttpUtils.post(URL_RM_BOOK, params)
                .then(response => {
                    if (response.msg == "请求成功") {
                        this.getNewData(params.book_list)
                    } else {
                        Alert.alert("网络请求出问题啦", response.msg)
                    }
                })
        }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <CommonNav
          navigator={this.props.navigator}
          title={this.props.item.list_name ? this.props.item.list_name: '书单'}
        />
        <ScrollView style={styles.item_container}>
          {this.state.book_list.map((item, i) => {
            return (
              <BookItem2
                key={item.book_id}
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
