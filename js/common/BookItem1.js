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

export default class BookItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <View style={styles.item}>
			<Image style={styles.image} source={{uri:this.props.data.picture}} />
			<View style={styles.information}>
				<Text style={styles.item_title}>{this.props.data.title}</Text>
			    <Text style={styles.item_author}>{this.props.data.author} 著</Text>
			    <Text style={styles.item_publish}>{this.props.data.publish} {this.props.data.time}</Text>
			    <View style={styles.round}>
			    	<Image style={styles.round_image} source={require("../../res/images/round.png")}>
			    	    <Text style={styles.round_num}>{this.props.data.num}</Text>
			    	</Image>
			    </View>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	image: {
		height:96,
		width:61
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