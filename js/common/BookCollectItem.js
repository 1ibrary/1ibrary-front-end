import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Image,
	Dimensions,
	Animated,
	Easing,
	AsyncStorage
} from "react-native";
const WIDTH = Dimensions.get("window").width;
const INNERWIDTH = WIDTH - 16;

 
export default class BookCollectItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			select:false,
			marginLeft:new Animated.Value(8),
		}
	}
	onMove() {
		// // this.setState({style:{marginLeft:-86}})
		Animated.timing(this.state.marginLeft,{
			toValue:-86,
			 duration: 200, // 动画时间
            // easing: Easing.linear
		}).start()

	}
	componentWillMount() {
		this._gestureHandler = {
			onStartShouldSetResponder: () => true, 
			onMoveShouldSetResponder:()=>true,
			onResponderMove:(evt)=>{
				this.onMove(evt)
			},
			// onResponderRelease:()=>{
			// 	alert("你停止了滑动")
			// }
		}
	}
	static defaultProps = {
		data:{},
	}
	render() {
		let select_image = require("../../res/images/select.png")
		let unselect_image = require("../../res/images/unselect.png")
		let data = this.props.data;
		return <View
					{...this._gestureHandler}
					onResponderGrant={(select, data)=>{
				     	data = this.props.data
				     	// alert(data)
				     	this.props.onPress(!this.state.select,data)
				     	this.setState({select:!this.state.select})

				     }}
				     style={styles.container}
				>
			<Animated.View style={[styles.item,this.props.style,{marginLeft:this.state.marginLeft}]}>
				<View style={styles.item_text}>
					<Text style={styles.item_title}>{data.title}</Text>
				    <Text style={styles.item_des}>{data.des}</Text>
				</View>
				<TouchableWithoutFeedback
				     onPress={()=>{
				     	let data = this.props.data
				     	// alert(data)
				     	this.props.onPress(!this.state.select,data)
				     	this.setState({select:!this.state.select})
				     }}
				     >
					<Image style={styles.select} source={this.state.select?select_image:unselect_image}/>
				</TouchableWithoutFeedback>
			</Animated.View>
			<TouchableOpacity
				onPress={()=>{
					this.props.onDelete(this.props.data.title)
				}}
			>
				<Image  style={styles.delete} source={require("../../res/images/icon_clear.png")}/>
			</TouchableOpacity>
		</View>
	}
}

const styles = StyleSheet.create({
	container:{
		width:WIDTH+86,
		flexDirection:"row",
		alignItems:"center"
	},
	item:{
		width:INNERWIDTH,
		backgroundColor:"white",
		borderRadius:8,
		// marginTop:20,
		// marginLeft:8,
		alignItems:"center",
		flexDirection:"row",
		height:64,
		marginBottom:8,
		marginLeft:-86
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
	},
	delete: {
		marginLeft:INNERWIDTH*0.12
	}
});