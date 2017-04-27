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
			        	/>
			        	<Image style={styles.image_search} source={require("../../res/images/search_image.png")}/>
		            {this.props.icon}
	            </View>
    }
}

const styles = StyleSheet.create({
	container : {
		// flex:1,
		// flexDirection:"",
		alignItems:"center",
		height:44/667*HEIGHT,
		width:INNERWIDTH,
		marginTop:36*HEIGHT/667,
		backgroundColor:"rgb(242,246,250)",
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
		left:92/360*INNERWIDTH,
		top:16*HEIGHT/667,
		zIndex:2
	},
	close: {
		fontSize:17,
		color:"#FF7373"
	},
	textInput: {
		width:INNERWIDTH,
		height:44*HEIGHT/667,
		paddingLeft:114/360*INNERWIDTH,
		backgroundColor:"white",
		borderRadius:8,
		// marginTop:28/667*HEIGHT,
		// position:"absolute",
		// left:16,
		// top:25,
		flexDirection:"row",
		alignItems:"center",
		fontSize:14
	}
});