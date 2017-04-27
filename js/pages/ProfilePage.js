import  React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	Dimensions,
	AsyncStorage
} from "react-native";
import TextPingFang from "../common/TextPingFang";
import BookCollectPage from "./BookCollectPage";
import RentInfoPage from "./RentInfoPage";
import FeedBackPage from "./FeedBackPage";
import AboutUsPage from "./AboutUsPage";
import SettingPage from "./SettingPage";


const WIDTH = Dimensions.get("window").width
const INNERWIDTH = WIDTH - 16
const HEIGHT = Dimensions.get("window").height

export default class ProfilePage extends Component {
	onLists() {
		AsyncStorage.getItem("book_list",(error,array)=>{
			let lists
			array = JSON.parse(array)
			if(array) {
				lists = array
			} else {
				lists = []
			}
			this.props.navigator.push({
				component:BookCollectPage,
				params:{
					lists:lists,
					title:"我的书单",
					user:this.props.user,
					timestamp:this.props.timestamp
				}
		    })

	    })
	}
	onHistory() {
		this.props.navigator.push({
			component:RentInfoPage,
			params:{
				title:"借阅历史"
			}

		})
	}
	onAboutUs() {
		this.props.navigator.push({
			component:AboutUsPage
		})
	}
	onJump(page,params){
		this.props.navigator.push({
			component:page,
			params:params
		})
	}
	render() {
		let booklist = require("../../res/images/icon_booklist.png")
		let history = require("../../res/images/icon_history.png")
		let setting = require("../../res/images/icon_setting.png")
		// let apps = require("../../res/images/icon_apps.png")
		let feedback = require("../../res/images/icon_feedback.png")
		let aboutus = require("../../res/images/icon_aboutus.png")
		let images = [booklist,history,setting,feedback,aboutus,images]
		let texts = ["我的书单","借阅历史","设置","意见反馈","关于我们"]
		let male_pic = require("../../res/images/avatar.png");
		let fm_pic = require("../../res/images/avatar2.png")
		return <View style={styles.container}>
			<View style={styles.info_container}>
				<Image style={styles.avatar} source={require("../../res/images/avatar_bg.png")}>
				<Image style={styles.avatar_round} source={require("../../res/images/avatar_round.png")}>
					<Image style={this.props.user.user_sex?{marginTop:-6}:{}}source={this.props.user.user_sex?fm_pic:male_pic}/>
				</Image>
					
					<TextPingFang style={styles.avatar_font}>{this.props.user.user_name}</TextPingFang>
				</Image>
			</View>
			<View style={styles.items1}>
			    {
			    	texts.map((d,i)=>{
			    		if(i>=3) return 
			    		return <TouchableOpacity 
			    					key={i}
			    					onPress={
			    						()=>{
			    							let text = d
			    							switch(text) {
			    								case "我的书单":
			    									this.onJump(BookCollectPage,{
															title:"我的书单",
															user:this.props.user,
															timestamp:this.props.timestamp
														});
			    									break;
			    							    case "借阅历史":
			    							    	this.onHistory()
			    							    	break;
			    							    case "设置":
			    							    	this.onJump(SettingPage,{title:"设置"})
			    							    	break;
			    							}
			    						}
			    					}
			    	 			style={styles.item}>
					               <Image source={images[i]}/>
					           <TextPingFang style={styles.item_font}>{d}</TextPingFang>
								<Image style={styles.item_arrow} source={require("../../res/images/right_arrow.png")}/>
						</TouchableOpacity>
			    	})
			    }
				
			</View>
			<View style={styles.items2}>
				{
			    	texts.map((d,i)=>{
			    		if(i<3) return 
			    		return <TouchableOpacity 
			    					onPress={
			    						()=>{
			    							switch(d) {
			    							    case "意见反馈":
			    							    	this.onJump(FeedBackPage,{
			    							    		user:this.props.user,
			    							    		timestamp:this.props.timestamp,
			    							    		navigator:this.props.navigator
			    							    	})
			    							    	break
			    							    case "关于我们":
			    							    	this.onAboutUs()
			    							}
			    						}
			    					}
			    					key={i} style={styles.item}>
					               <Image source={images[i]}/>
					           <TextPingFang style={styles.item_font}>{d}</TextPingFang>
								<Image style={styles.item_arrow} source={require("../../res/images/right_arrow.png")}/>
						</TouchableOpacity>
			    	})
			    }
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		height:HEIGHT,
		alignItems:"center"
	},
	info_container:{
		alignItems:"center",
		width:INNERWIDTH
	},
	avatar: {
		justifyContent:"center",
		alignItems:"center",
		marginTop:52,
		width:INNERWIDTH
	},
	avatar_round: {
		justifyContent:"center",
		alignItems:"center",
	},
	item: {
		width:WIDTH-30/375*WIDTH,
		flexDirection:"row",
		marginLeft:30/375*WIDTH,
		alignItems:"center",
		height:56/667*HEIGHT,
	},
	item_font: {
		fontSize:14,
		fontWeight:"500",
		color:"#666666",
		marginLeft:16,
		width:56
	},
	item_arrow: {
		position:"absolute",
		right:30/375*WIDTH
	},
	items1: {
		marginTop:24
	},
	items2: {
		marginTop:40
	},
	avatar_font:{
		color:"#666666",
		fontSize:17,
		backgroundColor:"rgba(0,0,0,0)",
		marginTop:15,
		fontWeight:"600"
	}
})