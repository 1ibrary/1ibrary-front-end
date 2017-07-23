import React, { Component } from 'React'
import LoginPage from './Login'
import HomePage from "./Home"
import SearchPage from "./Search"
import BookInfo from "./BookInfo"
import BookCollect from "./BookCollect"
import BookCollectAdd from "./BookCollectAdd"
import BookCollectList from "./BookCollectList"
import RentInfo from "./RentInfo"
import Setting from "./Setting"
import FeedBack from "./FeedBack"
import SearchResult from "./SearchResult"
import AboutUs from "./AboutUs"
import {Scene, Router, ActionConst,Actions} from 'react-native-router-flux'
import * as scenes from '../constants/scene'

export default class AppRouter extends Component {
  render() {
    return (
        <Router>
          <Scene key="root">
              <Scene
                  key={scenes.SCENE_LOGIN}
                  component={LoginPage}
                  title="登录"
                  type={ActionConst.RESET}
                  duration={0}
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_INDEX}
                  component={HomePage}
                  title="首页"
                  type={ActionConst.REPLACE}
                  hideNavBar
                  duration={0}
                  />
              <Scene
                  key={scenes.SCENE_SEARCH}
                  component = {SearchPage}
                  title="搜索"
                  hideNavBar
                  duration={0}
                  />
              <Scene
                  key={scenes.SCENE_BOOK_INFO}
                  component = {BookInfo}
                  title="图书详情"
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_BOOK_COLLECT}
                  component = {BookCollect}
                  title="收藏本书"
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_BOOK_COLLECT_ADD}
                  component = {BookCollectAdd}
                  title="新建书单"
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_BOOK_COLLECT_LIST}
                  component = {BookCollectList}
                  title="书单内容"
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_MESSAGE}
                  component = {RentInfo}
                  title="通知内容"
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_SETTING}
                  component = {Setting}
                  title="设置页面"
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_FEEDBACK}
                  component = {FeedBack}
                  title="反馈页面"
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_ABOUTUS}
                  component = {AboutUs}
                  title="关于我们页面"
                  hideNavBar
              />
              <Scene
                  key={scenes.SCENE_SEARCH_RESULT}
                  component = {SearchResult}
                  title="搜索结果"
                  hideNavBar
              />
          </Scene>
        </Router>
    )
  }
}