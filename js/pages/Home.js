import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  ListView,
  Dimensions,
  ScrollView
} from 'react-native'
import BookList from '../components/BookList'
import SearchPage from './Search'
import SearchNav_Welcome from '../components/SearchNavHomePage'
import MessagePage from './Message'
import ProfilePage from './Profile'
import {HEIGHT,getResponsiveHeight} from '../common/styles'
import {Scene, Router, ActionConst,Actions} from 'react-native-router-flux'
import {SCENE_SEARCH} from "../constants/scene"
import TabNavigator from 'react-native-tab-navigator'


export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedTab: 'home'
    }
  }

  icons = {
      home: {
          default: <Image
              style={styles.image}
              source={require('../../res/images/Home.png')}
          />,
          selected:<Image source={require('../../res/images/Home1.png')} />
      },
      message: {
          default:<Image
              style={styles.image}
              source={require('../../res/images/message.png')}
          />,
          selected:<Image
              style={styles.image}
              source={require('../../res/images/message.png')}
          />
      },
      profile: {
          default: <Image
              style={styles.image}
              source={require('../../res/images/profile.png')}
          />,
          selected:  <Image source={require('../../res/images/profile1.png')} />
      }
  }
  render() {
    return (
    <View style={styles.tabs_container}>
      <TabNavigator>
        <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="首页"
            renderIcon={() => this.icons.home.default
                }
            renderSelectedIcon={() => this.icons.home.selected
                }
            onPress={() => this.setState({ selectedTab: 'home' })}
        >
          <View style={styles.container}>
            <View style={styles.list}>
              <SearchNav_Welcome
                  placeholder={'搜索'}
                  onFocus={() => {
                      let params =    {
                          user: this.props.user,
                          timestamp: this.props.timestamp,
                      }
                      Actions[SCENE_SEARCH](params)
                  }}
              />
              <BookList
                  style={styles.book_list}
                  timestamp={this.props.timestamp}
                  data={this.props.books_data ? this.props.books_data : []}
                  user={this.props.user ? this.props.user : {}}
                  navigator={this.props.navigator}
                  token={this.props.token}
              />
            </View>
          </View>
        </TabNavigator.Item>
        <TabNavigator.Item
            selected={this.state.selectedTab === 'message'}
            title="通知"
            renderIcon={() =>
                this.icons.message.default
            }
            renderSelectedIcon={() =>
                this.icons.message.selected
            }
            onPress={() => this.setState({ selectedTab: 'message' })}
        >
          <MessagePage navigator={this.props.navigator} />
        </TabNavigator.Item>
        <TabNavigator.Item
            selected={this.state.selectedTab === 'profile'}
            title="我的"
            renderIcon={() =>
                this.icons.profile.default
            }
            renderSelectedIcon={() =>
                this.icons.profile.selected
            }
            onPress={() => this.setState({ selectedTab: 'profile' })}
        >
          <ProfilePage
              timestamp={this.props.timestamp}
              user={this.props.user ? this.props.user : {}}
              navigator={this.props.navigator}
          />
        </TabNavigator.Item>
      </TabNavigator>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    flexDirection: 'column',
    backgroundColor: 'rgb(242,246,250)',
    alignItems: 'center',
    height: HEIGHT
  },
  top: {
    height: 28,
    backgroundColor: 'white',
    marginTop: -28,
    width: 375
  },
  book_list: {
    // 一半的输入框高度加上maginBottom
    paddingTop: getResponsiveHeight(10)
  },
  search_result_bar: {
    backgroundColor: 'white'
  },
  tabs_container: {
      flex: 1,
      backgroundColor: 'white'
  },
  page1: {
      flex: 1,
      backgroundColor: 'yellow'
  },
  page2: {
      flex: 1,
      backgroundColor: 'blue'
  },
  image: {
      tintColor: '#929292'
  },
  active: {
      tintColor: '#607D8B'
  }
})
