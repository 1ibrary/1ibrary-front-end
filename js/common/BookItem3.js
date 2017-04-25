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
	AsyncStorage,
	PanResponder
} from "react-native";
import BookItem1 from "./BookItem1";
import Round from "./Round";
import BookInfoPage from "../pages/BookInfoPage";
import HttpUtils from "../../HttpUtils";
const WIDTH = Dimensions.get("window").width;
const INNERWIDTH = WIDTH - 16;

export default class BookItem2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			marginLeft: new Animated.Value(8),
		}
	}
	componentWillMount() {
		// this._gestureHandler = {
		// 	onStartShouldSetResponder: () => true, 
		// 	onMoveShouldSetResponder:()=>true,
		// 	// onResponderRelease:()=>{
		// 	// 	alert("你停止了滑动")
		// 	// }
		// }
		 this._panResponder_move = PanResponder.create({
      // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove:(evt, gestureState) => {
			    		this.onMove(gestureState)
			    	},
			 
        })
		 this._panResponder_touch = PanResponder.create({
      // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
           
        })
	}
	onMove(ev) {
		if(ev.dx<0) {
		    Animated.timing(this.state.marginLeft,{
		    	toValue:-86,
		    	 duration: 200, // 动画时间
                // easing: Easing.linear
		    }).start()
		} else if(ev.dx>0) {
			Animated.timing(this.state.marginLeft,{
		    	toValue:8,
		    	 duration: 200, // 动画时间
                // easing: Easing.linear
		    }).start()
		}
	}
	render() {
		return <View
					{...this._panResponder_move.panHandlers}
					style={styles.container}  
		     		>
				<Animated.View style={[styles.item,this.props.style,{marginLeft:this.state.marginLeft}]}
			
			>
		    <View
		    	{...this._panResponder_touch.panHandlers}
				onPress={
					()=>{
						this.onPress();
					}
				}
		        >
				 <View style={[styles.item,this.props.style]}>
			          <Image style={styles.image} source={{uri:this.props.item.book_cover}} />
			          <View style={styles.information}>
			          	<Text style={styles.item_title}>{this.props.item.book_title}</Text>
			              <Text style={styles.item_author}>{this.props.item.book_author}</Text>
			              <Text style={styles.item_publish}>{this.props.item.book_publish} {this.props.item.time}</Text>
			              <Text style={styles.item_grade}>{this.props.item.book_rate!==0?this.props.item.book_rate+" 分":"暂无评分"}</Text>
			          </View>
			          <View style={styles.round}>
			              <Round data={this.props.item.book_last_number}/>
			          </View>
		         </View>
			</View>	
			
		     </Animated.View>
		     <TouchableOpacity
				onPress={()=>{
					this.props.onDelete(this.props.item);
				}}
				style={styles.delete_container}
			>
				<Image  
				    style={styles.delete} source={require("../../res/images/icon_clear.png")}/>
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
	delete_container:{
		marginLeft:8
	},
	delete: {
		marginLeft:INNERWIDTH*0.12-8,
	},
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
		flexDirection:"row"
	},
	round:{
		position:"absolute",
		top:62,
		right:12
	},
	
})