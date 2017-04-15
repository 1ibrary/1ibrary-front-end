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

export default class BookCollectAddPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title:"",
			des:""
		}
	}
	rightOnPress(){
		AsyncStorage.getItem("book_list",(error,array)=>{
			// alert(array);
			array = JSON.parse(array)
			let item = {
				title:this.state.title,
				des:this.state.des,
				books:[]
			}
			let flag = true;
			if(array&&array.length>0){
				flag = array.some((d)=>{
					return d.title===item.title
				})
				if(!flag){
				    array = [...array,item]
				}
			} else {
				array = [item]
			}
			AsyncStorage.setItem("book_list",JSON.stringify(array),(error)=>{
				if(error) {
					alert(error)
				}
				this.props.onCallBack()
				this.props.navigator.pop()
			});
		});
	}
	render() {
		return <View style={styles.container}>
			<RightButtonNav title="创建书单"
				rightOnPress={
					()=> {
						this.rightOnPress();
					}
				}
				navigator={this.props.navigator}
			/>
			<TextInput
				placeholder="书单标题"
				placeholderTextColor="#999999"
				style={styles.textInput_title}
				onChangeText = {
					(text) => {
						this.setState({title:text});
					}
				}
				/>
			<TextInput
				placeholder="描述一下你的书单吧～"
				style={styles.textInput_des}
				multiline={true}
				onChangeText = {
					(text) => {
						this.setState({des:text});
					}
				}
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
		fontSize:17,
		fontFamily:"PingFang SC",
		fontWeight:"500",
		width:INNERWIDTH,
		height:48,
		alignItems:"center",
		backgroundColor:"white",
		marginTop:8,
		marginLeft:8,
		paddingLeft:16,
		borderRadius:8
	},
	textInput_des: {
		fontFamily:"PingFang SC",
		fontSize:14,
		// paddingTop:20,
		paddingHorizontal:8,
		height:98,
		width:INNERWIDTH,
		marginTop:8,
		backgroundColor:"white",
		marginLeft:8,
		borderRadius:8
	}
});
