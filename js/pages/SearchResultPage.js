import React, { Component } from "react"
import { View, StyleSheet, StatusBar, Dimensions, Text } from "react-native"
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar
} from "react-native-scrollable-tab-view"
import BookList from "../common/BookList"
import BookItem1 from "../common/BookItem1"
import HttpUtils from "../../HttpUtils"

const URL = "https://mie-mie.tech/books/search_book"
const WIDTH = Dimensions.get("window").width
const INNERWIDTH = WIDTH - 16

export default class SearchResultPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data0: [],
      data1: [],
      data2: []
    }
  }
  componentDidMount() {
    HttpUtils.post(URL, {
      uid: this.props.user.uid,
      timestamp: this.props.timestamp,
      token: this.props.user.token,
      content: this.props.content,
      type: 0
    }).then(response => {
      // alert(response.msg);
      if (response.msg === "请求成功") {
        this.setState({ data0: response.data })
      }
    })
  }
  onChangeTab(index) {
    HttpUtils.post(URL, {
      uid: this.props.user.uid,
      timestamp: this.props.timestamp,
      token: this.props.user.token,
      content: this.props.content,
      type: index
    }).then(response => {
      // alert(response.msg);
      if (response.msg === "请求成功") {
        if (index == 1) {
          this.setState({ data1: response.data })
        } else {
          this.setState({ data2: response.data })
        }
      }
    })
  }
  render() {
    let none = (
      <View style={styles.remind}>
        <Text style={styles.remind_font}>暂无结果</Text>
      </View>
    )
    return (
      <View style={styles.container}>

        <ScrollableTabView
          style={styles.scrollable_tab_view}
          renderTabBar={() =>
            <DefaultTabBar
              tabStyle={{
                // alignItems:"center",
                // justifyContent:"center",
                // width:100
                // width:50,
                // marginLeft:30
              }}
              style={styles.scrollable}
            />}
          tabBarInactiveTextColor={"#CDD8E2"}
          tabBarActiveTextColor={"#73C0FF"}
          tabBarUnderlineStyle={styles.active_tag}
          tabBarTextStyle={{
            fontSize: 14,

            fontFamily: "PingFang SC"
          }}
          onChangeTab={o => {
            this.onChangeTab(o.i)
          }}
        >
          <View style={styles.page_container} tabLabel="书名">
            <View style={styles.booklist}>
              {this.state.data0.length === 0
                ? none
                : this.state.data0.map((item, i) => {
                    return (
                      <BookItem1
                        key={i}
                        data={item}
                        style={styles.item}
                        navigator={this.props.navigator}
                        user={this.props.user}
                        timestamp={this.props.timestamp}
                      />
                    )
                  })}
            </View>
          </View>
          <View style={styles.page_container} tabLabel="作者">
            <View style={styles.booklist}>
              {this.state.data1.length === 0
                ? none
                : this.state.data1.map((item, i) => {
                    return (
                      <BookItem1
                        key={i}
                        data={item}
                        style={styles.item}
                        user={this.props.user}
                        timestamp={this.props.timestamp}
                        navigator={this.props.navigator}
                      />
                    )
                  })}
            </View>
          </View>
          <View style={styles.page_container} tabLabel="出版社">
            <View style={styles.booklist}>
              {this.state.data2.length === 0
                ? none
                : this.state.data2.map((item, i) => {
                    return (
                      <BookItem1
                        key={i}
                        data={item}
                        style={styles.item}
                        navigator={this.props.navigator}
                        user={this.props.user}
                        timestamp={this.props.timestamp}
                      />
                    )
                  })}
            </View>
          </View>
        </ScrollableTabView>
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // marginTop:8,
    backgroundColor: "rgb(242,246,250)"
    // backgroundColor:""
  },
  page_container: {
    // alignItems:"center",
    backgroundColor: "rgb(242,246,250)",
    width: 375,
    paddingLeft: 16,
    marginTop: 12
  },
  scrollable_tab_view: {
    marginLeft: 0,
    width: Dimensions.get("window").width,
    alignItems: "center"
  },
  active_tag: {
    backgroundColor: "#73C0FF",
    width: 70 * WIDTH / 375,
    marginLeft: 30 * WIDTH / 375,
    height: 4,
    borderRadius: 4
  },
  scrollable: {
    height: 44,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: "white",
    marginLeft: 8,
    width: Dimensions.get("window").width,
    alignItems: "center"
    // paddingLeft:92
    // color:"red",
  },
  booklist: {
    backgroundColor: "rgb(242,246,250)"
  },
  item: {
    marginBottom: 8
  },
  remind: {
    width: INNERWIDTH,
    alignItems: "center",
    marginTop: 20
  },
  remind_font: {
    color: "#73C0FF"
  }
})
