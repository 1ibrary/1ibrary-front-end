import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import { getResponsiveHeight, getResponsiveWidth, HEIGHT, INNERWIDTH, WIDTH } from '../../common/styles'
import Book from '../../components/Book'
import SearchNav from '../../components/SearchNav'
import { SCENE_SEARCH } from '../../constants/scene'
import HttpUtils from '../../network/HttpUtils'
import { BOOKS } from '../../network/Urls'
import Toast from 'antd-mobile/lib/toast'

const URL = BOOKS.search_book

export default class SearchResultPage extends Component {

  state = {
    bookName: [],
    author: [],
    publishingHouse: []
  }

  async componentDidMount() {
    const data = await this.fetchBooks(0)
    this.setState({ bookName: data })
  }

  fetchBooks = async (index) => {
    Toast.loading('正在加载', 0)

    const params = {
      content: this.props.content,
      type: index
    }

    let response = (await HttpUtils.post(URL, params)) || {}

    if (response.status !== 0) {
      Toast.fail(response.msg, 1)
      return []
    }

    Toast.hide()

    return response.data
  }

  onChangeTab = async (index) => {
    const data = await this.fetchBooks(index)

    if (index == 1) {
      this.setState({ author: data })
    } else {
      this.setState({ publishingHouse: data })
    }
  }

  render() {
    
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
            {this.renderList('bookName')}
          </View>
          <View style={styles.page_container} tabLabel="作者">
            {this.renderList('author')}
          </View>
          <View style={styles.page_container} tabLabel="出版社">
            {this.renderList('publishingHouse')}
          </View>
        </ScrollableTabView>
      </View>
    )
  }

  renderList = (listName) => {

    const None = (
      <View style={styles.remind}>
        <Text style={styles.remind_font}>暂无结果</Text>
      </View>
    )

    const list = this.state[listName]

    if (list.length === 0) {
      return None
    }

    return (
      <ScrollView style={styles.booklist}>
        {
          list.map((item, i) => {
            return <Book key={i} data={item} style={styles.item} />
          })
        }
      </ScrollView>
    )

  }

  componentWillUnmount () {
    Toast.hide()
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
