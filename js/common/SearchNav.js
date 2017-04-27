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
const WIDTH = Dimensions.get("window").width;
const INNERWIDTH = WIDTH - 16;
const HEIGHT = Dimensions.get("window").height;


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
		// value:""
		onChangeText: (text)=>{
			
		}
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
		return  <View style={[styles.container,this.props.style]}>
			        <TextInput style={[styles.textInput,this.props.textinputColor]}
			        	placeholder={this.props.placeholder}
			        	placeholderColor={"rgb(165,165,165)"}
			        	defaultValue = {this.props.defaultValue}
			        	// onTextChange={
			        	// 	()=>{
			        			
			        	// 	}
			        	// }
			        	onChangeText={
			        		(text)=>{
			        			this.props.onChangeText(text);
			        		}
			        	}
			        	onFocus={()=>{
			        		if(this.props.onFocus) {
			        			this.props.onFocus();
			        		}
			        		
			        	}}
			        	clearButtonMode={"while-editing"}
			        	onSubmitEditing={(event)=>{
			        		if(this.props.onSubmitEditing) {
			        			this.props.onSubmitEditing(event);
			        		}
			        	}}/>
			        	<Image style={styles.image_search} source={require("../../res/images/search_image.png")}/>
		            {this.props.icon}
	            </View>
    }
}

const styles = StyleSheet.create({
	container : {
		// flex:1,
		flexDirection:"row",
		alignItems:"center",
		// justifyContent:"center",
		height:36,
		marginTop:28,
		width:INNERWIDTH,
		
	},
	show:{
		display:"flex"
	},
	hide:{
		display:"none"
	},
	image_search: {
		// backgroundColor:"#F3F3F3",
		borderRadius:0,
		position:"absolute",
		left:8,
		top:7,
		zIndex:2
	},
	// close: {
	// 	fontSize:17,
	// 	color:"#FF7373"
	// },
	textInput: {
		width:316*WIDTH/375,
		height:28,
		paddingLeft:30*WIDTH/375,
		backgroundColor:"white",
		borderRadius:8,
		// marginTop:28,
		// position:"absolute",
		// left:16,
		// top:25,
		flexDirection:"row",
		alignItems:"center",
		fontSize:14
	}
});