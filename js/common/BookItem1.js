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

export default class BookItem extends Component {
	constructor(props) {
		super(props);
		this.state= {
			blue:require("../../res/images/round_blue.png"),
			red:require("../../res/images/round_red.png")
		} 
	}
	render() {
		// if(!this.props.data) {
		// 	return ;
		// }
		return <View style={styles.item}>
			<Image style={styles.image} source={{uri:this.props.data.picture}} />
			<View style={styles.information}>
				<Text style={styles.item_title}>{this.props.data.title}</Text>
			    <Text style={styles.item_author}>{this.props.data.author}</Text>
			    <Text style={styles.item_publish}>{this.props.data.publish} {this.props.data.time}</Text>
			    <Text style={styles.item_grade}>{this.props.data.grade}</Text>
			</View>
			 <View style={styles.round}>
			    	<Image style={styles.round_image} source={this.props.data.num===0?this.state.red:this.state.blue}>
			    	    <Text style={styles.round_num}>{this.props.data.num}</Text>
			    	</Image>
			    </View>
		</View>
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
		width:Dimensions.get("window")-16,
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
		height:36,
		width:36,
		position:"absolute",
		top:62,
		right:12
		
	},
	round_image: {
		// tintColor:"#607D8B",
		alignItems:"center",
		justifyContent:"center"
	},
	round_num: {
		color:"white",
		fontSize:14,
		backgroundColor:"rgba(0,0,0,0)"
	}
});