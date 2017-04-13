import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ListView,
	Dimensions
} from "react-native";
import BookItem1 from "./BookItem1";

export default class BookList extends Component {
	constructor(props) {
		super(props);
		let data = this.props.data?this.props.data:[
		    {grade:9.3,title:"设计心理学4:未来设计",num:5,author:"唐纳德诺曼",publish:"中信出版社",time:2015,picture:"https://imgsa.baidu.com/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=b52bcf617f094b36cf9f13bfc2a517bc/9c16fdfaaf51f3de300988da9deef01f3b2979d0.jpg"},
		    {grade:9.3,title:"平凡的世界",num:4,author:"路遥",publish:"电子工业出版社",time:2013,picture:"https://imgsa.baidu.com/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=b52bcf617f094b36cf9f13bfc2a517bc/9c16fdfaaf51f3de300988da9deef01f3b2979d0.jpg"},
		    {grade:"暂无评分",title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
			{grade:9.3,title:"人人都是产品经理",num:0,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
			{grade:9.3,title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
			{grade:9.3,title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"},
			{grade:9.3,title:"人人都是产品经理",num:3,author:"苏杰",publish:"电子工业出版社",time:2013,picture:"http://facebook.github.io/react/img/logo_og.png"}
		]
		const ds = new ListView.DataSource({
				rowHasChanged:(r1,r2)=>r1!==r2
			});
		this.state = {
			dataSource: ds.cloneWithRows(this.props.data?this.props.data:data)
		}
		// alert(this.props.data)
	}
	renderRow(data) {
		return <BookItem1 data={data}/>;
	}
	render() {
		return <View style={[styles.booklist,this.props.style]}>
			<ListView
				dataSource={this.state.dataSource}
				renderRow={(data)=>this.renderRow(data)}
			/>
		</View>
	}
}

const styles = StyleSheet.create({
	booklist: {
		marginTop:10,
		width:Dimensions.get("window")-16
	},
});