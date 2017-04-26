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
import BookCollectListPage from "../pages/BookCollectListPage";
import HttpUtils from "../../HttpUtils";
const WIDTH = Dimensions.get("window").width;
const INNERWIDTH = WIDTH - 16;
const URL_BOOKS = "https://mie-mie.tech/lists/show_detail"

 
export default class BookCollectItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			select:false,
			marginLeft:new Animated.Value(8),
			change:this.marginLeft==8?true:false
		}
	}
	onMove(ev) {
		// this.setState({style:{marginLeft:-86}})
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

	onPress(evt,ges) {
		if(ges.dx!==0) {
			return 
		}
		data = this.props.data
		if(this.state.change) {
			return;
		}
		// alert(data)
		this.props.navigator.push({
			component:BookCollectListPage,
			params:{
				title:this.props.title,
				user:this.props.user,
				timestamp:this.props.timestamp,
				book_list:this.props.data.book_list
			}
		})
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
            onPanResponderRelease: (evt, gestureState) => {
 				 	this.onPress(evt,gestureState)
              },
			  
           
        })
		}
	static defaultProps = {
		data:{},
	}
	render() {
		let select_image = require("../../res/images/select.png")
		let unselect_image = require("../../res/images/unselect.png")
		let data = this.props.data;
		return <View
					{...this._panResponder_move.panHandlers}
				     style={styles.container}  
				     // onStartShouldSetResponderCapture={()=>{
				     // 	return this.state.change
				     // }}
			    // onPanResponderMove={(evt)=>{
				   //        this.onMove(evt)

			    //      }}
			    
				>
			<Animated.View 			
			    style={[styles.item,this.props.style,{marginLeft:this.state.marginLeft}]}>
				<View 
					{...this._panResponder_touch.panHandlers}
					style={styles.item_text}>
					<Text style={styles.item_title}>{data.list_name}</Text>
				    <Text style={styles.item_des}>{data.list_content}</Text>
				</View>
				{
					this.props.big_title==="加入书单" ?
					<TouchableWithoutFeedback
				// {...this._panResponder_touch_2.panHandlers}
				     onPress={()=>{
				     	let data = this.props.data
				     	// alert(data)
				     	this.props.onPress(!this.state.select,data)
				     	this.setState({select:!this.state.select})
				     	return ;
				     }}
				     >
						<View style={styles.select}>
							<Image  source={this.state.select?select_image:unselect_image}/>
						</View>
					</TouchableWithoutFeedback>:
					<View></View>
				}
				
			</Animated.View>
			<TouchableOpacity
				onPress={()=>{
					this.props.onDelete(this.props.data.list_name)
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
		paddingLeft:8,
		width:360,
		height:64,
		paddingTop:12
	},
	item_des: {
		fontFamily:"PingFang SC",
		fontSize:12,
		color:"#999999"
	},
	select:{
		position:"absolute",
		right:5,
		height:64,
		width:60,
		alignItems:"center",
		justifyContent:"center"
	},
	delete_container:{
		marginLeft:8
	},
	delete: {
		marginLeft:INNERWIDTH*0.12-8,
	}
});