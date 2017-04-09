import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ListView
} from "react-native";

export default class BookList extends Component {
	constructor(props) {
		super(props);
		let data = [
		    {title:"设计心理学4:未来设计",num:5,author:"唐纳德诺曼",publish:"中信出版社",time:2015,picture:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491754581994&di=1db59cd5fa4e2820fb04022afb517d68&imgtype=0&src=http%3A%2F%2Ffdfs.xmcdn.com%2Fgroup18%2FM09%2F4E%2F71%2FwKgJJVeWMA3iSLL6AABg7zEQtSQ734.jpg"},
		    {title:"平凡的世界",num:4,author:"路遥",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
		    {title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
			{title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
			{title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
			{title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
			{title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"}
		]
		const ds = new ListView.DataSource({
				rowHasChanged:(r1,r2)=>r1!==r2
			});
		this.state = {
			dataSource: ds.cloneWithRows(data)
		}
	}
	renderRow(data) {
		 picture_path = "../../res/images/test1.png";
		return <View style={styles.item}>
			<Image style={styles.image} source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491754581994&di=1db59cd5fa4e2820fb04022afb517d68&imgtype=0&src=http%3A%2F%2Ffdfs.xmcdn.com%2Fgroup18%2FM09%2F4E%2F71%2FwKgJJVeWMA3iSLL6AABg7zEQtSQ734.jpg"}} />
			<View style={styles.information}>
				<Text style={styles.item_title}>{data.title}</Text>
			    <Text style={styles.item_author}>{data.author} 著</Text>
			    <Text style={styles.item_publish}>{data.publish} {data.time}</Text>
			    <View style={styles.round}>
			    	<Image style={styles.round_image} source={require("../../res/images/round.png")}>
			    	    <Text style={styles.round_num}>{data.num}</Text>
			    	</Image>
			    </View>
			</View>
		</View>
	}
	render() {
		return <View style={styles.booklist}>
			<ListView
				dataSource={this.state.dataSource}
				renderRow={(data)=>this.renderRow(data)}
			/>
		</View>
	}
}

const styles = StyleSheet.create({
	image: {
		height:96,
		width:61
	},
	booklist: {
		marginTop:64
	},
	item :{
		borderBottomWidth:1,
		borderBottomColor:"rgb(230,230,234)",
		paddingVertical:14,
		paddingHorizontal:16
	},
	information: {
		position:"absolute",
		left:98,
		top:33
	},
	item_title: {
		fontSize:16,
		color:"#607D8B",
	},
	item_author: {
		fontSize:10,
		fontWeight:"200",
		color:"#000000",
		fontFamily:"Heiti SC",
		marginTop:10,
		marginBottom:12
	},
	item_publish: {
		fontSize:10,
		fontWeight:"200",
		color:"#000000",
		fontFamily:"Heiti SC",
	},
	round:{
		height:40,
		width:40,
		position:"absolute",
		left:220,
		top:10,
	},
	round_image: {
		tintColor:"#607D8B",
		alignItems:"center",
		justifyContent:"center"
	},
	round_num: {
		color:"white",
		fontSize:20,
		backgroundColor:"#607D8B"
	}
});