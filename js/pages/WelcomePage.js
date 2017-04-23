import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ScrollView,
	Dimensions,
	TextInput,
	AsyncStorage
} from "react-native";
// import CommonNav from "../common/CommonNav";
import TextPingFang from "../common/TextPingFang";
import HttpUtils from "../../HttpUtils";
import HomePage from "./HomePage";

const WIDTH = Dimensions.get("window").width;
const INNERWIDTH = WIDTH - 16;
const HEIGHT = Dimensions.get("window").height;
const URL = "https://mie-mie.tech/users/login";

export default class WelcomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			account:"",
			password:""
		}
	}
	onSubmit() {
		// alert(HttpUtils.changeData({
		// 	    user_account:this.state.account,
		// 	    user_password:this.state.password
		//     }))
		HttpUtils.post(URL,{
			    user_account:this.state.account,
			    user_password:this.state.password
		    })
			.then((response)=>{
				// alert("哈哈")
				if(response.msg==="请求成功") {
					AsyncStorage.setItem("user_info",JSON.stringify(response.data),(error)=>{
						if(error) {
							console.log(error);
						} else {
							this.props.navigator.push({
								component:HomePage,
								params:{
									user_name:response.data.user_name
								}
							})
						}
					});
				}
				// alert(response.msg);
			})
			.catch((error)=> {
				// alert("错了")
				console.log(error)
			});
	}
	render() {
		return <View style={styles.container}>
			<Image style={styles.bg} source={require("../../res/images/welcome_bg.png")}>
				<Image style={styles.logo} source={require("../../res/images/welcome_logo.png")}/>
				<View style={styles.text}>
					<TextPingFang style={styles.title}>一图</TextPingFang>
				    <TextPingFang style={styles.e_title}>1 Library</TextPingFang>
				</View>
				<View style={styles.form}>
				    <TextInput 
				        placeholder={"                 请输入您的学号"}
				        placeholderTextColor={"white"}
				    	style={styles.textinput}
				    	onChangeText={(text)=>{
				    		this.setState({account:text})
				    	}}
				    	/>
				    <TextInput 
				    	placeholder={"                    请输入密码"}
				    	placeholderTextColor={"white"}
				        style={styles.textinput}
				        onChangeText={(text)=>{
				    		this.setState({password:text})
				    	}}
				        />
				    <Text style={styles.remind}>请使用数字广大的账号密码登录哦</Text>
				    <TouchableOpacity 
				    	onPress={()=>{
				    			this.onSubmit();
				    		}}
				        style={styles.online}>
				    	<Text 
				    	    style={styles.online_font}>登录</Text>
				    </TouchableOpacity>
			    </View>
			</Image>
			
		</View>
	}
}

const styles = StyleSheet.create({
	container : {
		backgroundColor:"#73C0FF",
		width:WIDTH,
		height:HEIGHT
	},
	bg: {
		alignItems:"center"
	},
	logo: {
		marginTop:60
	},
	text: {
		alignItems:"center",
	},
	title:{
		backgroundColor:"rgba(0,0,0,0)",
		color:"white",
		fontSize:20,
		fontWeight:"600",
		height:33,
		marginTop:28
	},
	e_title: {
		backgroundColor:"rgba(0,0,0,0)",
		fontSize:12,
		color:"white"
	},
	form:{
		marginTop:32,
		alignItems:"center",
		justifyContent:"center",
		// width:240
	},
	textinput: {
		height:44,
		width:240,
		color:"white",
		backgroundColor:"rgb(139,203,255)",
		borderRadius:22,
		marginBottom:14,
		fontSize:14,
		alignItems:"center",
		justifyContent:"center",
		paddingLeft:10,
		flexDirection:"row"
	},
	remind: {
		fontSize:10,
		color:"white",
		// width:160,
		marginTop:25,
		backgroundColor:"rgba(0,0,0,0)"
	},
	online:{
		marginTop:80,
		backgroundColor:"white",
		alignItems:"center",
		justifyContent:"center",
		width:150,
		height:44,
		borderRadius:22
	},
	online_font: {
		fontSize:14
	}
})