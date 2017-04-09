import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	TouchableOpacity
} from "react-native";
import NavigationBar from "./NavigationBar";

export default class SearchNav extends Component {
	render() {
		return  <View>
				<Image style={styles.image} source={require("../../res/images/search_icon.png")}/>

			<TextInput style={styles.textInput}>
		</TextInput>
		<TouchableOpacity style={styles.scan}>
		<Image source={require("../../res/images/scan.png")}/>
	</TouchableOpacity>
	    </View>
    }
}

const styles = StyleSheet.create({
	scan: {
		position:"absolute",
		left:337,
		top:31
	},
	image: {
		width:35,
		height:34,
		backgroundColor:"#F3F3F3",
		borderRadius:18,
		position:"absolute",
		left:16,
		top:25,
		zIndex:2
	},

	textInput: {
		width:303,
		height:34,
		backgroundColor:"#F3F3F3",
		borderRadius:18,
		position:"absolute",
		left:16,
		top:25,
		paddingLeft:40
	}
});