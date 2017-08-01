import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Dimensions, Text } from 'react-native'
import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar
} from 'react-native-scrollable-tab-view'
import { BOOKS } from '../network/Urls'
import BookList from '../components/BookList'
import BookItem1 from '../components/Book'
import HttpUtils from '../network/HttpUtils'
import SearchNav from '../components/SearchNav'
import { Actions } from 'react-native-router-flux'
import { SCENE_SEARCH } from '../constants/scene'
import {
  WIDTH,
  INNERWIDTH,
  HEIGHT,
  getResponsiveHeight,
  getResponsiveWidth
} from '../common/styles'

const URL = BOOKS.search_book

export default class SearchResultPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data0: [],
      data1: [],
      data2: []
    }
  }
  async componentDidMount() {
    let params = {
      content: this.props.content,
      type: 0
    }
    let response = (await HttpUtils.post(URL, params)) || {}
    if (resopnse.status === 0) {
      this.setState({ data0: response.data })
    }
  }
  async onChangeTab(index) {
    let params = {
      content: this.props.content,
      type: index
    }
    let response = (await HttpUtils.post(URL, params)) || {}
    if (resopnse.status === 0) {
      if (index == 1) {
        this.setState({ data1: response.data })
      } else {
        this.setState({ data2: response.data })
      }
    }
  }
  render() {
    let none = (
      <View style={styles.remind}>
        <Text style={styles.remind_font}>暂无结果</Text>
      </View>
    )
    return (
      <View style={styles.container}>
        <SearchNav
          type={'result'}
          textInputColor={{ backgroundColor: '#f9f9f9' }}
          style={{ backgroundColor: 'white' }}
          onFocus={() => {
            Actions[SCENE_SEARCH]()
          }}
        />
        <ScrollableTabView
          style={styles.scrollable_tab_view}
          renderTabBar={() => <DefaultTabBar style={styles.scrollable} />}
          tabBarInactiveTextColor={'#CDD8E2'}
          tabBarActiveTextColor={'#73C0FF'}
          tabBarUnderlineStyle={styles.active_tag}
          tabBarTextStyle={{
            fontSize: 14,
            fontFamily: 'PingFang SC'
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
                    return <BookItem1 key={i} data={item} style={styles.item} />
                  })}
            </View>
          </View>
          <View style={styles.page_container} tabLabel="作者">
            <View style={styles.booklist}>
              {this.state.data1.length === 0
                ? none
                : this.state.data1.map((item, i) => {
                    return <BookItem1 key={i} data={item} style={styles.item} />
                  })}
            </View>
          </View>
          <View style={styles.page_container} tabLabel="出版社">
            <View style={styles.booklist}>
              {this.state.data2.length === 0
                ? none
                : this.state.data2.map((item, i) => {
                    return <BookItem1 key={i} data={item} style={styles.item} />
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
    alignItems: 'center',
    backgroundColor: 'rgb(242,246,250)',
    height: HEIGHT
  },
  page_container: {
    backgroundColor: 'rgb(242,246,250)',
    width: WIDTH,
    // paddingLeft: getResponsiveWidth(16),
    marginTop: getResponsiveHeight(13),
    alignItems: 'center'
  },
  scrollable_tab_view: {
    marginLeft: 0,
    width: WIDTH,
    alignItems: 'center'
  },
  active_tag: {
    backgroundColor: '#73C0FF',
    width: getResponsiveWidth(375 - 70) / 3,
    marginLeft: getResponsiveWidth(12),
    height: getResponsiveHeight(4),
    borderRadius: getResponsiveHeight(4)
  },
  scrollable: {
    height: 44,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: 'white',
    width: WIDTH,
    alignItems: 'center'
  },
  booklist: {
    backgroundColor: 'rgb(242,246,250)'
  },
  item: {
    marginBottom: 8
  },
  remind: {
    width: INNERWIDTH,
    alignItems: 'center',
    marginTop: 20
  },
  remind_font: {
    color: '#73C0FF'
  }
})
