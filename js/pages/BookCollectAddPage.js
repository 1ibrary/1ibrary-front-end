import React, { Component } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert
} from "react-native"
import RightButtonNav from "../common/RightButtonNav"
import HttpUtils from "../../HttpUtils"
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height
const INNERWIDTH = WIDTH - 16

const URL = "https://mie-mie.tech/lists/create_list" // 缓存前先请求showxs
const URL_SHOW = "https://mie-mie.tech/lists/show_list"

export default class BookCollectAddPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list_name: "",
      list_content: ""
    }
  }
  rightOnPress() {
    if (!this.state.list_name.trim()) {
      Alert.alert("小提示", "请输入书单的名字哦！")
      return
    }
    if (!this.state.list_content.trim()) {
      Alert.alert("小提示", "请输入书单的描述内容哦！")
      return
    }
    AsyncStorage.getItem("book_list", (error, array) => {
      // alert(array);
      if (array) {
        array = JSON.parse(array)
      } else {
        array = []
      }
      let item = {
        list_name: this.state.list_name,
        list_content: this.state.list_content
      }
      let flag = false
      if (array && array.length > 0) {
        flag = array.some(d => {
          if (d.list_name === item.list_name) {
            Alert.alert("小提示", "你已经创建过同名书单啦！")
            this.props.navigator.pop()
            flag = true
            return true
          }
        })
        if (flag) {
          return
        }
      }

      HttpUtils.post(URL, {
        list_name: this.state.list_name,
        uid: this.props.user.uid,
        list_content: this.state.list_content,
        timestamp: this.props.timestamp,
        token: this.props.user.token
      })
        .then(response => {
          if (response.msg === "请求成功") {
            // alert("成功");
            // alert(array);
            HttpUtils.post(URL_SHOW, {
              token: this.props.user.token,
              uid: this.props.user.uid,
              timestamp: this.props.timestamp
            })
              .then(result => {
                if (result.msg === "请求成功") {
                  let lists = result.data
                  AsyncStorage.setItem(
                    "book_list",
                    JSON.stringify(lists),
                    error => {
                      if (error) {
                        console.log(error)
                      } else {
                        this.props.onCallBack()
                        this.props.navigator.pop()
                      }
                    }
                  )
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            Alert.alert("网络请求出错啦", response.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <RightButtonNav
          title="创建书单"
          rightOnPress={() => {
            this.rightOnPress()
          }}
          navigator={this.props.navigator}
        />
        <TextInput
          placeholder="书单标题"
          placeholderTextColor="#999999"
          style={styles.textInput_title}
          onChangeText={text => {
            this.setState({ list_name: text })
          }}
        />
        <TextInput
          placeholder="描述一下你的书单吧～"
          style={styles.textInput_des}
          multiline={true}
          onChangeText={text => {
            this.setState({ list_content: text })
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(242,246,250)",
    width: WIDTH,
    height: HEIGHT
  },
  textInput_title: {
    fontSize: 17,
    fontFamily: "PingFang SC",
    fontWeight: "500",
    width: INNERWIDTH,
    height: 48,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 8,
    marginLeft: 8,
    paddingLeft: 16,
    borderRadius: 8
  },
  textInput_des: {
    fontFamily: "PingFang SC",
    fontSize: 14,
    // paddingTop:20,
    paddingHorizontal: 8,
    height: 98,
    width: INNERWIDTH,
    marginTop: 8,
    backgroundColor: "white",
    marginLeft: 8,
    borderRadius: 8
  }
})
