import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native"
import BookItem1 from "../common/BookItem1"
import CommonNav from "../common/CommonNav"
import TextPingFang from "../common/TextPingFang"
import SettingItem from "../common/SettingItem"
import WelcomePage from "./WelcomePage"

const WIDTH = Dimensions.get("window").width
const INNERWIDTH = WIDTH - 16
const HEIGHT = Dimensions.get("window").height

export default class BookListPage extends Component {
  logout() {
    AsyncStorage.clear(error => {
      console.log(error)
    })
    this.props.navigator.push({
      component: WelcomePage
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <CommonNav navigator={this.props.navigator} title={this.props.title} />
        <View style={styles.items_container}>
          <SettingItem style={styles.item} text={"接受订阅图书消息"} />
          <SettingItem style={styles.item} text={"接受还书提醒"} />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.logout()
          }}
          style={styles.out}
        >
          <TextPingFang style={styles.out_font}>退出登录</TextPingFang>

        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: "rgb(242,246,250)",
    alignItems: "center"
  },
  out: {
    width: 296,
    height: 44,
    borderRadius: 25,
    backgroundColor: "#FF7373",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 80
  },
  out_font: {
    fontSize: 17,
    color: "white"
  },
  items_container: {
    marginTop: 8
  },
  item: {
    marginBottom: 8
  }
})
