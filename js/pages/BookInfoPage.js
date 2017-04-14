import React, {Component,PropTypes} from "react";
import {
	View, 
	Text,
	Image,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	TouchableHighlight,
	ScrollView,
	Dimensions
}from "react-native";
import CommonNav from "../common/CommonNav";

export default class BookInfoPage extends Component {
	render() {
		let bottomBar = (<View style={styles.bottom_bar}>
			<TouchableHighlight style={styles.subscribe}><Text style={styles.subscribe_font}>订阅</Text></TouchableHighlight>
			<TouchableHighlight style={styles.collect}><Text style={styles.collect_font}>收藏</Text></TouchableHighlight>
		</View>)
		
		return <View style={styles.container}>
			<CommonNav title={"图书详情"}/>
			<ScrollView>
				<View  style={styles.outline_container}>
					<Image source={}/>
				</View>
				<View  style={styles.test1}></View>
			</ScrollView>
			{bottomBar}
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		height:Dimensions.get("window").height,
		alignItems:"center"
	},
	outline_container:{
		alignItems:"center",
		width:Dimensions.get("window").width-16
	},
	bottom_bar: {
		flexDirection:"row",
		position:"absolute",
		bottom:0
	},
	subscribe:{
		justifyContent:"center",
		alignItems:"center",
		height:50,
		width:Dimensions.get("window").width*0.4,
		backgroundColor:"#F9F9F9",
		
	},
	subscribe_font: {
		color:"#999999",
		fontSize:17
	},
	collect:{
		justifyContent:"center",
		alignItems:"center",
		height:50,
		width:Dimensions.get("window").width*0.6,
		backgroundColor:"#73C0FF",
	},
	collect_font: {
		color:"#FFFFFF",
		fontSize:17
	}
});