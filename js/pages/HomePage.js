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
import BottomTabs from '../components/BottomTabs'
import BookList from '../components/BookList'
import SearchPage from './SearchPage'
import SearchNav_Welcome from '../components/SearchNavHomePage'
import MessagePage from './MessagePage'
import ProfilePage from './ProfilePage'
import {HEIGHT,getResponsiveHeight} from '../common/styles'


export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: 1
    }
  }

  render() {
    return (
      <BottomTabs
        page1={
          <View style={styles.container}>
            {this.state.show === 1
              ? <View style={styles.list}>
                  <SearchNav_Welcome
                    placeholder={'搜索'}
                    onFocus={() => {
                      this.setState({ show: 2 })
                    }}
                  />
                  <BookList
                    style={styles.booklist}
                    timestamp={this.props.timestamp}
                    data={this.props.books_data ? this.props.books_data : []}
                    user={this.props.user ? this.props.user : {}}
                    navigator={this.props.navigator}
                  />
                </View>
              : <SearchPage
                  navigator={this.props.navigator}
                  timestamp={this.props.timestamp}
                  user={this.props.user}
                  onPressClose={() => {
                    this.setState({ show: 1 })
                  }}
                />}
          </View>
        }
        page2={<MessagePage navigator={this.props.navigator} />}
        page3={
          <ProfilePage
            timestamp={this.props.timestamp}
            user={this.props.user ? this.props.user : {}}
            navigator={this.props.navigator}
          />
        }
      />
    )
    // return <BookCollectPage />
  }
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    flexDirection: 'column',
    alignItems: 'center',
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
  booklist: {
    // 一半的输入框高度加上maginBottom
    paddingTop: getResponsiveHeight(10)
  },
  search_result_bar: {
    backgroundColor: 'white'
  }
})
