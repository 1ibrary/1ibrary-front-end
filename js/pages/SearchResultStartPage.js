import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ListView,
} from "react-native";
import SearchResultPage from "./SearchResultPage"
// import SearchResultStartPage from "./SearchResultStartPage"

export default class SearchResultStartPage extends Component {
	render() {
		return  <Navigator
			initialRoute={
				{
					component:SearchResultPage,
					params:{
						props:this.props
					}
				}
			}
			renderScene={
				(route, navigator)=>{
					let data = route.params.data
					// alert(JSON.stringify(data))
					let Component = route.component
					return <Component navigator={navigator} {...route.params.props}/>
				}
			}/>
	}
}