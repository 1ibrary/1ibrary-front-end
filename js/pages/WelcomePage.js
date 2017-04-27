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
// import SplashScreen from 'react-native-splash-screen';

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
	// componentDidMount() {
 //    	 // do anything while splash screen keeps, use await to wait for an async task.
 //        SplashScreen.hide();
 //    }
	onSubmit() {
		// alert(HttpUtils.changeData({
		// 	    user_account:this.state.account,
		// 	    user_password:this.state.password
		//     }))
		if(!this.state.account.trim()) {
			alert("请输入学号哦~");
			return ;
		}
		if(!this.state.password.trim()) {
			alert("请输入密码哦~");
			return ;
		}
		HttpUtils.post(URL,{
			    user_account:this.state.account.trim(),
			    user_password:this.state.password.trim()
		    })
			.then((response)=>{
				// alert("哈哈")
				if(response.msg==="请求成功") {
					// alert(JSON.stringify(response.data));
					AsyncStorage.setItem("user_info",JSON.stringify(response.data),(error)=>{
						if(error) {
							console.log(error);
						} else {
							AsyncStorage.getItem("books_data",(error,array)=>{
								if(error) {
									console.log(error);
								} else {
									let user = response.data;
									// alert(JSON.stringify(response.timestamp));
									this.props.navigator.push({
								        component:HomePage,
								        params:{
								        	user:user,
								        	books_data:JSON.parse(array),
								        	timestamp:response.data.timestamp
								        }
							        });
								}
							})
						}
					});
				} else {
					alert(response.msg);
				}
				// alert(response.msg);
			})
			.catch((error)=> {
				// alert("错了")
				console.log(error);
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
				        placeholder={"请输入您的学号"}
				        placeholderTextColor={"white"}
				    	style={styles.textinput}
				    	onChangeText={(text)=>{
				    		this.setState({account:text})
				    	}}
				    	/>
				    <TextInput 
				    	placeholder={"请输入密码"}
				    	placeholderTextColor={"white"}
				        style={styles.textinput}
				        password={true}
				        onChangeText={(text)=>{
				    		this.setState({password:text})
				    	}}
				        />
				    <Text style={styles.remind}>请使用数字广大的账号密码登录哦</Text>
				    
			    </View>
			    <TouchableOpacity 
				    	onPress={()=>{
				    			this.onSubmit();
				    		}}
				        style={styles.online}>
				    	<Text 
				    	    style={styles.online_font}>登录</Text>
				    </TouchableOpacity>
			</Image>
			
		</View>
	}
}

const styles = StyleSheet.create({
	container : {
		backgroundColor:"#73C0FF",
		width:WIDTH,
		height:HEIGHT,
		alignItems:"center",
	},
	bg: {
		alignItems:"center",
		width:WIDTH,
		height:HEIGHT
	},
	logo: {
		marginTop:60*HEIGHT/667,
	},
	text: {
		alignItems:"center",
	},
	title:{
		backgroundColor:"rgba(0,0,0,0)",
		color:"white",
		fontSize:20,
		fontWeight:"600",
		height:33/667*HEIGHT,
		marginTop:HEIGHT*0.0419
	},
	e_title: {
		backgroundColor:"rgba(0,0,0,0)",
		fontSize:12,
		color:"white"
	},
	form:{
		marginTop:HEIGHT*0.0479,
		alignItems:"center",
		justifyContent:"center",
		// width:240
	},
	textinput: {
		height:44/667*HEIGHT,
		width:240/375*WIDTH,
		color:"white",
		backgroundColor:"rgb(139,203,255)",
		borderRadius:22/667*HEIGHT,
		marginBottom:14/667*HEIGHT,
		fontSize:14,
		alignItems:"center",
		justifyContent:"center",
		paddingLeft:10/375*WIDTH,
		flexDirection:"row"
	},
	remind: {
		fontSize:10,
		color:"white",
		// width:160,
		marginTop:HEIGHT*0.037,
		backgroundColor:"rgba(0,0,0,0)"
	},
	online:{
		position:"absolute",
		bottom:HEIGHT*0.115,
		backgroundColor:"white",
		alignItems:"center",
		justifyContent:"center",
		width:150/375*WIDTH,
		height:44/667*HEIGHT,
		borderRadius:22/667*HEIGHT
	},
	online_font: {
		fontSize:14
	}
})