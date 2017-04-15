import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions,
	TouchableHighlight,
	AsyncStorage,
	ScrollView
} from "react-native";
import RightButtonNav from "../common/RightButtonNav";
import BookCollectItem from "../common/BookCollectItem";
const INNERWIDTH = Dimensions.get("window").width - 16;
const HEIGHT = Dimensions.get("window").height

export default class BookCollectPage extends Component{
	constructor(props) {
		super(props)
		this.state = {
			lists:[],
			choosed:[]
		}
		AsyncStorage.getItem("book_list",(error,array)=>{
			array = JSON.parse(array)
			this.setState({lists:array})
		})
		
	}
	static defaultProps = {
		book:{
			book_title:"美洲小宇宙",
			book_content:"一本书带你深度探访中南美洲腹地，身未动，心已远。沿着旧地图，走不到新大陆，毕淑敏带你走出自助旅行新路线: “世界最美岛屿”加拉帕戈斯群岛，“热带雾林王冠上的宝石”哥斯达黎加蒙特维德雾林，古印第安人的太阳、月亮金字塔与亡灵大道，全球银饰之都塔斯科，切•格瓦拉故居……太多秘密，等你探索，太多奇迹，等你发现。",
			book_cover:"https://imgsa.baidu.com/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=b52bcf617f094b36cf9f13bfc2a517bc/9c16fdfaaf51f3de300988da9deef01f3b2979d0.jpg",
			book_key:"TB47-05-/9",
			book_place:"中文文科库(418)",
			book_author:"毕淑敏",
			book_publish:"湖南文艺出版社",
			book_rate:9.3,
			detail_data:[
			    {detail_place:"中文文科库418",detail_id:11,detail_key:1,detail_in:true},
			    {detail_place:"中文文科库418",detail_id:11,detail_key:2,detail_in:true},
			    {detail_place:"中文文科库418",detail_id:11,detail_key:3,detail_in:false}
			],
			book_last_number:2,
			book_subscribe:true
		}
	}
	rightOnPress() {
		AsyncStorage.getItem("book_list",(error,array)=>{
			if(error) {
				alert(error)
			} else {
				array = JSON.parse(array)
				this.state.choosed.map((item)=>{
					array.some((d)=>{
						if(d.title===item) {
							let books = d.books
							// alert(this.props.book)
							d.books = [...(new Set([...books,this.props.book]))]
							return d.title===item
						}
					})
				})
				AsyncStorage.setItem("book_list",JSON.stringify(array),(error)=>{
					if(error) {
						alert(error)
					} else {
						alert("成功!")
					}
				})
			}
		})
	}
	onPressButton(select,item) {
		let choosed = this.state.choosed
		if(select) {
			choosed = [...new Set([...choosed,item.title])]
		}  else {
			choosed.splice(choosed.indexOf(item.title),1)
		}
		this.setState({choosed:choosed})
	}
	render() {
		let lists = [
		    {title:"专业书籍",des:"反正就是很专业的啦"},
		    {title:"经典书籍",des:"反正就是很经典的啦"}
		]
		return <View style={styles.container}>
			<RightButtonNav 
				title="加入书单"
				rightOnPress={
					()=>this.rightOnPress()
				}/>
			<TouchableOpacity style={styles.add}>
				<Image source={require("../../res/images/icon_add.png")}/>
			</TouchableOpacity>
			<ScrollView style={styles.item_container}>
				{
				this.state.lists.map((item)=>{
					// if(item===null) {
					// 	return;
					// }
					return <BookCollectItem 
						onPress = {(select, data)=>this.onPressButton(select,data)}
					    key={item.title} data={item}/>
				})
			    }
			</ScrollView>
			

		</View>
	}
}	

const styles = StyleSheet.create({
	container:{
		backgroundColor:"rgb(242,246,250)",
		height:HEIGHT
	},
	add: {
		width:INNERWIDTH,
		borderRadius:8,
		marginLeft:8,
		height:48,
		marginTop:8,
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:"white"
	},
	item_container: {
		marginTop:20,
		marginLeft:8
	}

});