import React, { Component } from 'React'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import SearchPage from './pages/Search'
import BookInfo from './pages/BookInfo'
import BookCollect from './pages/BookCollect'
import BookCollectAdd from './pages/BookCollectAdd'
import BookCollectList from './pages/BookCollectList'
import RentInfo from './pages/RentInfo'
import Setting from './pages/Setting'
import FeedBack from './pages/FeedBack'
import SearchResult from './pages/SearchResult'
import AboutUs from './pages/AboutUs'
import AboutUsWeb from './pages/AboutUsWeb'
import { Scene, Router, ActionConst, Actions } from 'react-native-router-flux'
import * as scenes from './constants/scene'
import SplashScreen from './SplashScreen'

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key={scenes.SCENE_SPLASH_SCREEN}
            component={SplashScreen}
            initial
            type={ActionConst.RESET}
            duration={0}
            hideNavBar
          />
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
            component={SearchPage}
            title="搜索"
            hideNavBar
            duration={0}
          />
          <Scene
            key={scenes.SCENE_BOOK_INFO}
            component={BookInfo}
            title="图书详情"
            hideNavBar
          />
          <Scene
            key={scenes.SCENE_BOOK_COLLECT}
            component={BookCollect}
            title="收藏本书"
            hideNavBar
            duration={0}
          />
          <Scene
            key={scenes.SCENE_BOOK_COLLECT_ADD}
            component={BookCollectAdd}
            title="新建书单"
            hideNavBar
          />
          <Scene
            key={scenes.SCENE_BOOK_COLLECT_LIST}
            component={BookCollectList}
            title="书单内容"
            hideNavBar
          />
          <Scene
            key={scenes.SCENE_MESSAGE}
            component={RentInfo}
            title="通知内容"
            hideNavBar
          />
          <Scene
            key={scenes.SCENE_SETTING}
            component={Setting}
            title="设置页面"
            hideNavBar
          />
          <Scene
            key={scenes.SCENE_FEEDBACK}
            component={FeedBack}
            title="反馈页面"
            hideNavBar
          />
          <Scene
            key={scenes.SCENE_ABOUT_US}
            component={AboutUs}
            title="关于我们"
            hideNavBar
          />
          <Scene
            key={scenes.SCENE_SEARCH_RESULT}
            component={SearchResult}
            title="搜索结果"
            type={ActionConst.REPLACE}
            hideNavBar
          />
          <Scene
            key={scenes.SCENE_ABOUT_US_WEB}
            component={AboutUsWeb}
            title="关于我们页面"
            hideNavBar
          />
        </Scene>
      </Router>
    )
  }
}
