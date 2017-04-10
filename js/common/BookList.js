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
import BookItem1 from "./BookItem1";

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
		return <BookItem1 data={data}/>;
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
	booklist: {
		marginTop:64
	},
});