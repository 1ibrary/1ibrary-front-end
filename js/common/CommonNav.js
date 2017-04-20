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
		    	 leftButton={<TouchableOpacity 
		    	 	onPress={
		    	 		()=>{
		    	 			this.props.navigator.pop()
		    	 		}
		    	 	}
		    	 >
		    	<Image style={styles.image_icon1}
		    	    source={require("../../res/images/BackArrow.png")}/>
		    </TouchableOpacity>}
		    	rightButton={
		    		this.props.rightButton
		    	}
		    	/>
		</View>
	}
}

const styles = StyleSheet.create({
	image_icon1:{
		// position:"absolute",
		// left:16,
		// marginTop:-10
		// justifyContent: "center",
		// alignItems:"center",
		// // width:11.26,
		// // height:20.17,
		marginRight:126,
		marginLeft:16
	},

});