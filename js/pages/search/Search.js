import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import SearchNav from '../../components/SearchNav'
import { getResponsiveWidth, INNERWIDTH, HEIGHT, WIDTH } from '../../common/styles'
import { Actions } from 'react-native-router-flux'
import { SCENE_SEARCH_RESULT } from '../../constants/scene'
import SearchTags from '../../components/SearchTags'
import Storage from '../../common/storage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HttpUtils from '../../network/HttpUtils'
import { BOOKS } from '../../network/Urls'

const MAX_LENGTH = 5

export default class Search extends Component {

  state = {
    search_history: [],
    hot: [],
    defaultValue: '',
    page: 1,
    reminder: [],
    text: '',
    remind: false
  }

  async componentDidMount() {
    const array = await Storage.get('search_history', [])
    this.setState({ search_history: array })
    this.fetchHotSearch()
  }

  fetchHotSearch = async () => {
    const response = await HttpUtils.post(BOOKS.hot_search, {})
    this.setState({ hot: response.data.slice(0, 5) })
  }

  async onPressDelete(index) {
    let array = await Storage.get('search_history', [])
    if (array.length == 0 || index > array.length - 1) {
      return
    }
    array.splice(index, 1)
    array = [...new Set(array)]
    await Storage.set('search_history', array)
    this.setState({ search_history: array })
  }

  onSubmitEditing(text) {
    this.onSave(text)
    const params = { content: text }
    Actions[SCENE_SEARCH_RESULT](params)
  }

  // 暂时禁用搜索提示
  onChangeText(text) {
    // if (text === '') {
    //   this.setState({ remind: false })
    //   return
    // }
    // this.setState({ remind: true })
    // this.setState({ page: 2, information: data })
  }

  async onSave(text) {
    let array = await Storage.get('search_history', [])
    if (array.length != 0) {
      array = [...new Set([text, ...array])]
      if (array.length > MAX_LENGTH) {
        array = array.slice(0, 5)
      }
    } else {
      array = [text]
    }
    await Storage.set('search_history', array)
  }

  changeDefaultValue(item) {
    this.setState({ defaultValue: item })
  }

  render() {
    let reminder = (
      <SearchTags
        title="搜索提示"
        data={this.state.reminder}
        onPress={item => {
          this.changeDefaultValue(item)
        }}
      />
    )
    let tags = (
      <View style={styles.container}>
        <SearchTags
          title={'热门搜索'}
          data={this.state.hot}
          onPress={item => {
            this.changeDefaultValue(item)
          }}
        />
        <SearchTags
          styles={styles.tags_top}
          title={'搜索历史'}
          onPressDelete={() => {
            this.onPressDelete()
          }}
          cancel={true}
          data={this.state.search_history}
          onPress={item => {
            this.changeDefaultValue(item)
          }}
        />
      </View>
    )
    let content
    if (this.state.remind) {
      content = reminder
    } else {
      content = tags
    }

    return (
      <KeyboardAwareScrollView>
        <View style={styles.all_container}>
          <SearchNav
            placeholder={'搜索书名，作者或出版社'}
            defaultValue={this.state.defaultValue}
            onSubmitEditing={event => {
              this.onSubmitEditing(event.nativeEvent.text)
            }}
            onChangeText={text => {
              this.onChangeText(text)
            }}
          />
          {content}
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  result_container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: WIDTH
  },
  all_container: {
    height: HEIGHT,
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center',
    width: WIDTH
  },
  container: {
    marginTop: 8,
    alignItems: 'center',
    height: HEIGHT,
    width: INNERWIDTH
  },
  tags_top: {
    marginTop: 34
  },
  tags: {
    width: INNERWIDTH
  },
  tag_container: {
    borderRadius: 8,
    backgroundColor: 'white',
    width: INNERWIDTH,
    paddingLeft: 24,
    overflow: 'hidden'
  },
  tag_title: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '100',
    paddingBottom: 12
  },
  tag_item: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 44,
    width: 336,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
  },
  tag_font: {
    fontSize: 14,
    width: 300,
    color: 'gray',
    fontWeight: '400'
  },
  search_history: {
    marginTop: 34,
    width: INNERWIDTH
  },
  search_history_container: {
    borderRadius: 8,
    width: INNERWIDTH,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  search_history_title: {
    marginBottom: 10,
    fontSize: 14,
    color: 'gray',
    fontWeight: '100'
  },
  search_history_item: {
    height: 44,
    paddingLeft: 12,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
  },
  search_history_font: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '200',
    width: 200
  },
  search_history_delete: {
    marginLeft: 120
  },

  information: {
    marginTop: 64,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    width: 344,
    marginLeft: 16
  },
  information_item: {
    height: 40,
    paddingLeft: 16,
    width: getResponsiveWidth(344),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
  }
})
