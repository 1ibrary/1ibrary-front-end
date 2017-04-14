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
		    	title={"图书详情"}
		    	 leftButton={<TouchableOpacity style={styles.image_icon1}>
		    	<Image 
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
		justifyContent: "center",
		alignItems:"center",
		// width:11.26,
		// height:20.17,
		marginLeft:8
	},

});