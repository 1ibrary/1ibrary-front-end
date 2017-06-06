import React, { Component } from "react"
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image
} from "react-native"
import CommonNav from "../common/CommonNav"

export default class WelcomePage extends Component {
  render() {
    return (
      <View>
        <CommonNav
          title={"图书详情"}
          leftButton={
            <TouchableOpacity style={styles.image_icon}>
              <Image source={require("../../res/images/BackArrow.png")} />
            </TouchableOpacity>
          }
          rightButton={
            <TouchableOpacity style={styles.image_icon2}>
              <Image source={require("../../res/images/share.png")} />
            </TouchableOpacity>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image_icon1: {
    justifyContent: "center",
    alignItems: "center",
    width: 11.26,
    height: 20.17,
    position: "absolute",
    left: 16.83
  },
  image_icon2: {
    justifyContent: "center",
    alignItems: "center",
    width: 18,
    height: 21.59,
    position: "absolute",
    left: 340
  }
})
