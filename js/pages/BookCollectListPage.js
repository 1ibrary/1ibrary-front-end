import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	Dimensions,
	ScrollView
} from "react-native";
import BookItem1 from "../common/BookItem1";
import CommonNav from "../common/CommonNav"
const WIDTH = Dimensions.get("window").width;
const INNERWIDTH = WIDTH - 16;
const HEIGHT = Dimensions.get("window").height

export default class BookListPage extends Component {
	render() {
		return <View style={styles.container}>
			<CommonNav 
			    navigator={this.props.navigator}
				title={"专业书籍"}
				/>
			<ScrollView style={styles.item_container}>
				<BookItem1 navigator={this.props.navigator} style={styles.item}/>
				<BookItem1 navigator={this.props.navigator} style={styles.item}/>
				<BookItem1 navigator={this.props.navigator} style={styles.item}/>
			</ScrollView>
		</View>
	}
}

const styles = StyleSheet.create({
	container:{
		height:HEIGHT,
		backgroundColor:"rgb(242,246,250)"
	},
	item_container: {
		marginTop:8
	}
	,
	item: {
		marginLeft:8
	}
})