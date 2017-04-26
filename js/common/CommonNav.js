import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
} from "react-native";
import NavigationBar from "./NavigationBar";

export default class CommonNav extends Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		title:"图书详情",
		rightButton: <View></View>
	}
	render() {
		return <View>
		    <NavigationBar
		    	navBarStyle={this.props.navBarStyle}
		    	navStyle={this.props.navStyle}
		    	title={this.props.title}
		    	titleStyle={
		    	 	this.props.titleStyle
		    	 }
		    	 leftButton={
		    	 		<TouchableOpacity 
		    	 		onPress={
		    	 		()=>{
		    	 			this.props.navigator.pop()
		    	 		}

		    	 	}
		    	 	style={styles.container}
		    	 >	
		    	 	<Image
		    	    source={require("../../res/images/BackArrow.png")}/>
		    	
		    </TouchableOpacity>
		    	 	}
		    	rightButton={
		    		this.props.rightButton
		    	}
		    	/>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		position:"absolute",
		width:44,
		height:24,
		alignItems:"center",
		left:0
		// top:-20
    },
 //    container2: {
	// 	// alignSelf:"flex-start",
	// 	// justifyContent:"center",
	// 	position:"absolute",
	// 	top:10
	// 	// left:16,
	// 	// top:-20
 //    },
	// image_icon1:{

	// 	// position:"absolute",
	// 	// left:16,
	// 	// justifyContent: "center",
	// 	// alignItems:"center",
	// 	// // width:11.26,
	// 	// // height:20.17,
	// 	// marginRight:126,
	// 	// marginLeft:16
	// },

});