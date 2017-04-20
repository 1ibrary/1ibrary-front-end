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
		// icon:(
		// 	<TouchableOpacity>
		//         <Image style={{position:"absolute",left:337,top:31}} source={require("../../res/images/scan.png")}/>
	 //        </TouchableOpacity>
	 //     ),
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
		return  <View style={styles.container}>
			        <TextInput style={styles.textInput}
			        	placeholder={"请输入你想要搜索的书籍"}
			        	placeholderTextColor={"rgb(165,165,165)"}
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
			        	}}
			        	>
			        	<Image style={styles.image_search} source={require("../../res/images/search_image.png")}/>
			        </TextInput>
		            {this.props.icon}
	            </View>
    }
}

const styles = StyleSheet.create({
	contianer : {
		flex:1,
		// flexDirection:"",
		alignItems:"center",
		height:54,
		width:360,
		marginTop:16,
		backgroundColor:"rgb(242,246,250)",
		marginBottom:8
	},
	show:{
		display:"flex"
	},
	hide:{
		display:"none"
	},
	image_search: {
		width:13,
		height:13,
		// backgroundColor:"#F3F3F3",
		borderRadius:0,
		position:"absolute",
		left:92,
		top:15,
		zIndex:2
	},
	close: {
		fontSize:17,
		color:"#FF7373"
	},
	textInput: {
		width:360,
		height:44,
		paddingLeft:114,
		backgroundColor:"white",
		borderRadius:8,
		marginTop:28,
		// position:"absolute",
		// left:16,
		// top:25,
		flexDirection:"row",
		alignItems:"center",
		fontSize:14
	}
});