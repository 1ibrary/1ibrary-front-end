import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ListView,
  AsyncStorage,
  Dimensions
} from 'react-native'
import SearchNav from '../components/SearchNav'
import SearchResultPage from './SearchResultPage'
import {getResponsiveWidth,INNERWIDTH,HEIGHT,WIDTH} from "../common/styles"
import {Scene, Router, ActionConst,Actions} from 'react-native-router-flux'
import {SCENE_INDEX,SCENE_SEARCH_REMOVE} from "../constants/scene"

const MAX_LENGTH = 6

export default class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [],
      hot: ['人民的名义', '巨人的陨落', '时间简史', '平凡的世界'],
      hot_num: 0,
      history_num: 0,
      defaultValue: '',
      page: 1,
      information: ['平凡', '平凡的世界', '人间失格', '陕西师范大学出版社', '太宰治'],
      text: ''
    }
    // AsyncStorage.removeItem("history");
    AsyncStorage.getItem('history', (error, array) => {
      // alert(JSON.parse(array));
      if (JSON.parse(array)) {
        this.setState({ history: JSON.parse(array) })
      }
    })
    // AsyncStorage.getAllKeys((error,keys)=>{
    // 	if(!error) {
    // 		keys.reverse();
    // 		this.setState({history:keys});
    // 		// alert(this.state.history);
    // 	} else {
    // 		// alert("获取失败！");
    // 	}
    // });
  }
  onSave(text) {
    AsyncStorage.getItem('history', (error, array) => {
      array = JSON.parse(array)
      if (array) {
        array = [...new Set([text, ...array])]
      } else {
        array = [text]
      }
      // alert(array);
      AsyncStorage.setItem('history', JSON.stringify(array), error => {
        if (error) {
          console.log(error)
        }
      })
      this.setState({ history: array })
      this.setState({ history_num: 0 })
    })
  }
  onPressDelete() {
    AsyncStorage.getItem('history', (error, array) => {
      array = JSON.parse(array)
      if (array) {
        array.shift()
        array = [...new Set(array)]
      } else {
        return
      }
      // alert(array);
      AsyncStorage.setItem('history', JSON.stringify(array), error => {
        if (error) {
          console.log(error)
        }
      })
      this.setState({ history: array })
      this.setState({ history_num: 0 })
    })
  }
  onSubmitEditing(text) {
    this.onSave(text)
    this.setState({ page: 3, text: text })
  }
  onChangeText(text) {
    let data = ['平凡', '平凡的世界', '人间失格', '陕西师范大学出版社', '太宰治']
    this.setState({ page: 2, information: data })
  }
  render() {
    let content
    if (this.state.page === 3) {
      return (
        <View style={styles.all_container}>
          <View style={styles.result_container}>
            <SearchNav
              placeholder={'搜索书名，作者或出版社'}
              defaultValue={this.state.defaultValue}
              onSubmitEditing={event => {
                // alert(event.nativeEvent.text);
                this.onSubmitEditing(event.nativeEvent.text)
              }}
              icon={
                <TouchableOpacity
                  style={styles.close_container}
                  onPress={() => {
                    this.props.onPressClose()
                  }}
                >
                  <Text style={styles.close}>取消</Text>
                </TouchableOpacity>
              }
              textinputColor={{ backgroundColor: '#F9F9F9' }}
              onFocus={() => {
                this.setState({ page: 2 })
              }}
              onChangeText={text => {
                this.onChangeText(text)
              }}
            />
          </View>

          <SearchResultPage
            navigator={this.props.navigator}
            user={this.props.user}
            timestamp={this.props.timestamp}
            content={this.state.text}
            data={[
              {
                grade: '暂无评分',
                title: '设计心理学4:未来设计',
                num: 5,
                author: '唐纳德诺曼',
                publish: '中信出版社',
                time: 2015,
                picture:
                  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491754581994&di=1db59cd5fa4e2820fb04022afb517d68&imgtype=0&src=http%3A%2F%2Ffdfs.xmcdn.com%2Fgroup18%2FM09%2F4E%2F71%2FwKgJJVeWMA3iSLL6AABg7zEQtSQ734.jpg'
              }
            ]}
          />
        </View>
      )
    }
    if (this.state.page === 1) {
      content = (
        <View style={styles.container}>
          <View style={styles.tabs}>
            <Text style={styles.tab_title}>热门搜索</Text>
            <View style={styles.tab_container}>
              {this.state.hot.map((item, i) => {
                return (
                  <View key={i} style={styles.tab_item}>
                    <Text
                      style={styles.tab_font}
                      onPress={() => {
                        this.setState({ defaultValue: item, history_num: 0 })
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                )
              })}
            </View>
          </View>
          <View style={styles.history}>
            <Text style={styles.history_title}>搜索历史</Text>
            <View style={styles.history_container}>

              {this.state.history.map((item, i) => {
                this.state.history_num++
                if (this.state.history_num > MAX_LENGTH) {
                  return
                }
                return (
                  <View key={i} style={styles.history_item}>
                    <Text
                      onPress={() => {
                        this.setState({ defaultValue: item, history_num: 0 })
                      }}
                      style={styles.history_font}
                    >
                      {item}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.onPressDelete()
                      }}
                    >
                      <Image
                        style={styles.history_delete}
                        source={require('../../res/images/delete.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )
              })}

            </View>
          </View>
        </View>
      )
    } else if (this.state.page === 2) {
      content = (
        <View style={styles.tabs}>
          <Text style={styles.tab_title}>搜索建议</Text>
          <View style={styles.tab_container}>
            {this.state.information.map((item, i) => {
              return (
                <View key={i} style={styles.tab_item}>
                  <Text
                    style={styles.tab_font}
                    onPress={() => {
                      this.setState({ defaultValue: item, history_num: 0 })
                    }}
                  >
                    {item}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      )
    }
    return (
      <View style={styles.all_container}>
        <SearchNav
          placeholder={'搜索书名，作者或出版社'}
          defaultValue={this.state.defaultValue}
          onSubmitEditing={event => {
            // alert(event.nativeEvent.text);
            this.onSubmitEditing(event.nativeEvent.text)
          }}
          icon={
            <TouchableOpacity
              style={styles.close_container}
              onPress={() => {
                Actions.pop()
              }}
            >
              <Text style={styles.close}>取消</Text>
            </TouchableOpacity>
          }
          onChangeText={text => {
            this.onChangeText(text)
          }}
        />
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  result_container: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: WIDTH,
  },
  all_container: {
    height: HEIGHT,
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center',
    width: WIDTH,
  },
  container: {
    marginTop: 8,
    alignItems: 'center',
    height: HEIGHT,
    width:INNERWIDTH
  },
  tabs: {
    width: INNERWIDTH
  },
  tab_container: {
    borderRadius: 8,
    backgroundColor: 'white',
    width: INNERWIDTH,
    paddingLeft: 24,
    overflow: 'hidden'
  },
  tab_title: {
    fontSize: 14,
    color: 'gray',
    fontWeight: '100',
    paddingBottom: 12
  },
  tab_item: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 44,
    width: 336,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
  },
  tab_font: {
    fontSize: 14,
    width: 300,
    color: 'gray',
    fontWeight: '400'
  },
  history: {
    marginTop: 34,
    width: INNERWIDTH
  },
  history_container: {
    borderRadius: 8,
    width: INNERWIDTH,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  history_title: {
    marginBottom: 10,
    fontSize: 14,
    color: 'gray',
    fontWeight: '100'
  },
  history_item: {
    height: 44,
    paddingLeft: 12,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)'
  },
  history_font: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '200',
    width: 200
  },
  history_delete: {
    marginLeft: 120
  },
  close: {
    fontSize: 17,
    color: '#FF7373',
    alignItems: 'center'
  },
  close_container: {
    height: 28,
    width: 44,
    justifyContent: 'center',
    flexDirection: 'row'
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
