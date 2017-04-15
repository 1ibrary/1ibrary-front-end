import React, {Component} from "react";
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from "react-native";
import CommonNav from "../common/CommonNav";

export default class RightButtonNav extends Component {
	constructor(props) {
		super(props);
	}
	static defaultProps = {
		rightOnPress:()=>{}
	}
	render() {
		return <CommonNav 
				title={this.props.title}
			    rightButton={
				<TouchableOpacity
					onPress={ 
						()=>this.props.rightOnPress()
					}
				 style={styles.rightButton}>
					<Text style={styles.rightButton_font}>完成</Text>
				</TouchableOpacity>
				
			}/>
	}
}

styles = StyleSheet.create({
	rightButton:{
		position:"absolute",
		right:16
	},
	rightButton_font:{
		color:"#73C0FF",
		fontSize:17,
		fontWeight:"500"
	},
});