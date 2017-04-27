import React, {Component} from "React";
import {
	View,
	StyleSheet,
	Text,
	Navigator
} from "react-native";
import HomePage from "./HomePage"
import BookCollectListPage from "./BookCollectListPage"
import WelcomePage from "./WelcomePage";
import SplashScreen from 'react-native-splash-screen';


function setup() {
	// 进行一些初始化配置
	class Root extends Component {
		componentDidMount() {
    	 // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide();
    }
		renderScene(route, navigator) {
			let Component = route.component;
			return <Component {...route.params} navigator={navigator}/>;
		}
		render() {
			return <Navigator
			    initialRoute = {{component:WelcomePage}}
			    renderScene = {(route, navigator)=>{
						let Component = route.component
						return <Component navigator={navigator} {...route.params}/>
					}}
			    />
		}
	}
	
	return <Root/>
}

module.exports = setup;