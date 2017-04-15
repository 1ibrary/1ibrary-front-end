import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Image,
	Dimensions
} from "react-native";
const INNERWIDTH = Dimensions.get("window").width - 16;

 
export default class BookCollectItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			select:false
		}
	}
	static defaultProps = {
		data:{},
	}
	render() {
		let select_image = require("../../res/images/select.png")
		let unselect_image = require("../../res/images/unselect.png")
		let data = this.props.data;
		return <TouchableWithoutFeedback
					onPress={(select, data)=>{
				     	data = this.props.data
				     	// alert(data)
				     	this.props.onPress(!this.state.select,data)
				     	this.setState({select:!this.state.select})

				     }}
				>
			<View style={[styles.item,this.props.style]}>
				<View style={styles.item_text}>
					<Text style={styles.item_title}>{data.title}</Text>
				    <Text style={styles.item_des}>{data.des}</Text>
				</View>
				<TouchableWithoutFeedback
				     onPress={(select, data)=>{
				     	data = this.props.data
				     	// alert(data)
				     	this.props.onPress(!this.state.select,data)
				     	this.setState({select:!this.state.select})
				     }}
				     >
					<Image style={styles.select} source={this.state.select?select_image:unselect_image}/>
				</TouchableWithoutFeedback>
			</View>
		</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	item:{
		width:INNERWIDTH,
		backgroundColor:"white",
		borderRadius:8,
		// marginTop:20,
		// marginLeft:8,
		alignItems:"center",
		flexDirection:"row",
		height:64,
		marginBottom:8
	},
	item_title: {
		fontSize:17,
		fontFamily:"PingFang SC",
		color:"#666666"
	},
	item_text:{
		marginLeft:8
	},
	item_des: {
		fontFamily:"PingFang SC",
		fontSize:12,
		color:"#999999"
	},
	select:{
		position:"absolute",
		right:25
	}
});