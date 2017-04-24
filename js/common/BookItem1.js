import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ListView,
	Dimensions,
} from "react-native";
import Round from "./Round";
import BookInfoPage from "../pages/BookInfoPage";


export default class BookItem extends Component {
	constructor(props) {
		super(props);
		
	}
	static defaultProps = {
		data: {
			grade:9.3,
			title:"设计心理学4:未来设计",
			num:5,author:"唐纳德诺曼",
			publish:"中信出版社",
			time:2015,
			picture:"https://imgsa.baidu.com/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=b52bcf617f094b36cf9f13bfc2a517bc/9c16fdfaaf51f3de300988da9deef01f3b2979d0.jpg"
		}
	}
	render() {
		// if(!this.props.data) {
		// 	return ;
		// }
		return <TouchableOpacity
				onPress={
					()=>{this.props.navigator.push({
						component:BookInfoPage,
						params:{

						}
					})
				}
				}
		        >
				 <View style={[styles.item,this.props.style]}>
			          <Image style={styles.image} source={{uri:this.props.data.picture}} />
			          <View style={styles.information}>
			          	<Text style={styles.item_title}>{this.props.data.book_title}</Text>
			              <Text style={styles.item_author}>{this.props.data.book_author}</Text>
			              <Text style={styles.item_publish}>{this.props.data.book_publish} {this.props.data.time}</Text>
			              <Text style={styles.item_grade}>{this.props.data.book_rate!==0?this.props.data.book_rate+" 分":"暂无评分"}</Text>
			          </View>
			          <View style={styles.round}>
			              <Round data={this.props.data.book_last_number}/>
			          </View>
		         </View>
			</TouchableOpacity>
		   
	}
}

const styles = StyleSheet.create({
	image: {
		height:112,
		width:74,
		marginTop:20
	},
	item :{
		borderBottomWidth:1,
		borderBottomColor:"rgb(230,230,234)",
		// paddingTop:20,
		paddingHorizontal:12,
		backgroundColor:"white",
		width:Dimensions.get("window").width-16,
		height:160,
		borderRadius:8,
		marginBottom:8,
		flexDirection:"row"
	},
	information: {
		marginLeft:16,
		marginTop:16
	},
	item_title: {
		fontSize:17,
		color:"#494949",
		fontFamily:"PingFang SC",
		fontWeight:"500"
	},
	item_author: {
		fontSize:14,
		color:"#666666",
		fontFamily:"PingFang SC",
		marginVertical:8
	},
	item_publish: {
		fontSize:14,
		color:"#666666",
		fontFamily:"PingFang SC",
	},
	item_grade: {
		fontFamily:"PingFang SC",
		fontWeight:"500",
		color:"#FFB173",
		fontSize:17,
		marginTop:14,
		height:24
	},
	round:{
		position:"absolute",
		top:62,
		right:12
	},
	
});