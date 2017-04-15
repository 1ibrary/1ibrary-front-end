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
// import ShareNav from "../common/ShareNav";
import HomePage from "./HomePage"

export default class WelcomePage extends Component {
	constructor(props) {
		super(props);
		this.state={
			show:1
		}
	}

	// loadData() {
	// 	let url = "";
	// 	this.dataR
	// }
	render() {
		return <Navigator
				initialRoute={{
					component:HomePage
				}}
				renderScene={
					(route, navigator)=>{
						let Component = route.component
						return <Component navigator={navigator} {...route.params}/>
					}
				}
				>
			
		</Navigator>
		
	}
}

const styles = StyleSheet.create({
	container:{
		// flex:1,
		flexDirection:"column",
		alignItems:"center",
		backgroundColor:"rgb(242,246,250)",
		alignItems:"center"
	},
	top: {
		height:28,
		backgroundColor:"white",
		marginTop:-28,
		width:375
	},
	search_result_bar: {
		// paddingTop:28,
		backgroundColor:"white",
	}
});
