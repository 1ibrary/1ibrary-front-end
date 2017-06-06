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
const URL = "https://mie-mie.tech/users/feedback"

export default class FeedBackPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: "",
      content: ""
    }
  }
  onPost() {
    if (!this.state.contact.trim()) {
      Alert.alert("小提示", "请输入您的联系方式哦~")
      return
    }
    if (!this.state.content.trim()) {
      Alert.alert("小提示", "请输入您的反馈内容哦~")
      return
    }
    HttpUtils.post(URL, {
      token: this.props.user.token,
      content: this.state.content,
      contact: this.state.contact,
      uid: this.props.user.uid,
      timestamp: this.props.timestamp
    }).then(response => {
      // alert(response.msg);
      if (response.msg === "请求成功") {
        // alert("已经提交啦～");
        this.props.navigator.pop()
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <RightButtonNav
          title={"意见反馈"}
          rightOnPress={() => {
            this.onPost()
          }}
          navigator={this.props.navigator}
        />
        <TextInput
          placeholder={"请输入您的邮箱或者电话"}
          placeholderTextColor={"#999999"}
          style={styles.textInput_title}
          onChangeText={text => {
            this.setState({ contact: text })
          }}
        />
        <TextInput
          placeholder={"描述一下你的体验或者建议吧～"}
          placeholderTextColor={"#999999"}
          multiline={true}
          style={[styles.textInput_title, styles.textInput_content]}
          onChangeText={text => {
            this.setState({ content: text })
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
    fontFamily: "PingFang SC",
    fontSize: 14,
    width: INNERWIDTH,
    height: 48,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 8,
    marginLeft: 8,
    paddingLeft: 16,
    borderRadius: 8
  },
  textInput_content: {
    height: 270
  }
})
