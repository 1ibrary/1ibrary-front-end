import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	TouchableOpacity,
	PropTypes,
	AsyncStorage,
	Dimensions
} from "react-native";
import NavigationBar from "./NavigationBar";
import SearchPage from "../pages/SearchPage";
const history = "history";


export default class SearchNav extends Component {
	constructor(props) {
		super(props);
		// this.state = {
			
		// }
	}
	// static defaultStyles = {
	// 	scan: {
	// 		position:"absolute",
	// 		left:337,
	// 		top:31
	// 	}
	// }
	static defaultProps = {
		icon:(
			<TouchableOpacity>
		        <Image style={{position:"absolute",left:337,top:31}} source={require("../../res/images/scan.png")}/>
	        </TouchableOpacity>
	     ),
		// value:""
	}
	// onSave(text) {
	// 	AsyncStorage.setItem(text,text,(error)=>{
	// 		// if(!error) {
	// 		// 	alert("保存成功!");
	// 		// } else {
	// 		// 	alert("保存失败！")
	// 		// }
	// 	});
	// 	AsyncStorage.getAllKeys((error,keys)=>{alert(keys)});
	// }
	render() {
		return  <View style={styles.container}>
			        <TextInput style={styles.textInput}
			        	placeholder={this.props.placeholder}
			        	placeholderColor={"rgb(165,165,165)"}
			        	defaultValue = {this.props.defaultValue}
			        	// onTextChange={
			        	// 	()=>{
			        			
			        	// 	}
			        	// }
			        	onFocus={()=>{
			        		if(this.props.onFocus) {
			        			this.props.onFocus();
			        		}
			        		
			        	}}
			        	onSubmitEditing={(event)=>{
			        		if(this.props.onSubmitEditing) {
			        			this.props.onSubmitEditing(event);
			        		}
			        	}}
			        	>

			       		<Image style={styles.image} source={require("../../res/images/search_icon.png")}/>
			        </TextInput>
		            {this.props.icon}
	            </View>
    }
}

const styles = StyleSheet.create({
	contianer : {
		flex:1,
		flexDirection:"row",
		alignItems:"center",
		height:44
	},
	show:{
		display:"flex"
	},
	hide:{
		display:"none"
	},
	image: {
		width:35,
		height:34,
		backgroundColor:"#F3F3F3",
		borderRadius:18,
		position:"absolute",
		left:0,
		top:0,
		zIndex:2
	},
	close: {
		width:20,
		height:20,
		position:"absolute",
		top:32,
		right:15
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