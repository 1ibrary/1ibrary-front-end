import React, {Component} from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Dimensions,
	AsyncStorage
} from "react-native";
import RightButtonNav from "../common/RightButtonNav";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const INNERWIDTH =  WIDTH - 16;

export default class FeedBackPage extends Component {
	render() {
		return <View style={styles.container}>
			<RightButtonNav
				title={"意见反馈"}
				rightOnPress={()=>{
					    this.props.navigator.pop()
				    }
			    }
			    navigator={
			    	this.props.navigator
			    }
			    />
			<TextInput
				placeholder={"请输入您的邮箱或者电话"}
				placeholderTextColor={"#999999"}
				style={styles.textInput_title}
				/>
			<TextInput
				placeholder={"描述一下你的体验或者建议吧～"}
				placeholderTextColor={"#999999"}
				multiline={true}
				style={[styles.textInput_title,styles.textInput_content]}
				/>
				
		</View>
	}
}

const styles = StyleSheet.create({
	container:{ 
		backgroundColor:"rgb(242,246,250)",
		width: WIDTH,
		height: HEIGHT
	},
	textInput_title: {
		fontFamily:"PingFang SC",
		fontSize:14,
		width:INNERWIDTH,
		height:48,
		alignItems:"center",
		backgroundColor:"white",
		marginTop:8,
		marginLeft:8,
		paddingLeft:16,
		borderRadius:8,
	},
	textInput_content: {
		height:270
	}
})