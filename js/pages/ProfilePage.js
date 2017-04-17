import  React, {Component} from "react"
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	Dimensions,
	AsyncStorage
} from "react-native"
import TextPingFang from "../common/TextPingFang"
import BookCollectPage from "./BookCollectPage"
import RentInfoPage from "./RentInfoPage"
import FeedBackPage from "./FeedBackPage"

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
					lists:lists
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
	onFeedBack() {
		this.props.navigator.push({
			component:FeedBackPage,
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
		return <View style={styles.container}>
			<View>
				<Image style={styles.avatar} source={require("../../res/images/avatar_bg.png")}>
					<Image source={require("../../res/images/avatar.png")}/>
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
			    							switch(d) {
			    								case "我的书单":
			    									this.onLists()
			    							    case "借阅历史":
			    							    	this.onHistory()
			    							    case "意见反馈":
			    							    	this.onFeedBack()
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
			    								case "我的书单":
			    									this.onLists()
			    							    case "借阅历史":
			    							    	this.onHistory()
			    							    case "意见反馈":
			    							    	this.onFeedBack()
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
	avatar: {
		justifyContent:"center",
		alignItems:"center",
		marginTop:52
	},
	item: {
		width:WIDTH-30,
		flexDirection:"row",
		marginLeft:30,
		alignItems:"center",
		height:56
	},
	item_font: {
		fontSize:14,
		fontWeight:"500",
		color:"#666666",
		marginLeft:16,
		width:56
	},
	item_arrow: {
		marginLeft:206
	},
	items1: {
		marginTop:24
	},
	items2: {
		marginTop:40
	}
})