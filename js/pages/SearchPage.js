import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ListView,
	AsyncStorage,
	Dimensions,
} from "react-native";
import SearchNav from "../common/SearchNav";
const MAX_LENGTH = 8;

export default class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history:[],
			history_num:0,
			textInput:"",
		}
		// AsyncStorage.removeItem("history");
		AsyncStorage.getItem("history",(error,array)=>{
			// alert(JSON.parse(array));
			if(JSON.parse(array)){
				this.setState({history:JSON.parse(array)});
			}
			
		});
		// AsyncStorage.getAllKeys((error,keys)=>{
		// 	if(!error) {
		// 		keys.reverse();
		// 		this.setState({history:keys});
		// 		// alert(this.state.history);
		// 	} else {
		// 		// alert("获取失败！");
		// 	}
		// });
	}
	onSave(text) {
		AsyncStorage.getItem("history",(error,array)=>{
			array = JSON.parse(array);
			if(array){
				array = [...new Set([text,...array])];
			} else {
				array = [text];
			}
			// alert(array);
			AsyncStorage.setItem("history",JSON.stringify(array),(error)=>{
				if(error) {
					alert(error);
				}
			});
			this.setState({history:array});
			this.setState({history_num:0});
	    });
	}
	render() {
		return (
		<View>
		<SearchNav 
		    placeholder={"搜索书名，作者或出版社"}
		    value={this.state.textInput}
		    onSubmitEditing={
		    	(event)=>{
		    		// alert(event.nativeEvent.text);
		    		this.onSave(event.nativeEvent.text);
		    	}
		    }
		    icon={
		    	<TouchableOpacity
		    		onPress={
		    			()=>{this.props.onPressClose()}
		    		}
		    	>
		            <Image style={styles.close} source={require("../../res/images/close.png")}/>
	            </TouchableOpacity>
		    }
		    />
		<View style={[styles.container,this.props.style]}>
		  
		 <View style={styles.tabs}>
			<Text style={styles.tab_title}>热门搜索</Text>
			<View style={styles.tab_container}>
			    {
			    	this.state.history.map((item)=>{
				    return <View style={styles.tab_item}>
				        <Text style={styles.tab_font}
				        	onPress={
				        		()=>{
				        			this.setState({textInput:item,history_num:0})
				        		}
				        	}
				        >{item}</Text>
				    </View>
			    })
			    }
			</View>
			</View>
			<View style={styles.history}>
				<Text style={styles.history_title}>历史记录</Text>
				<View>{
						this.state.history.map((item)=>{
						this.state.history_num++;
						if(this.state.history_num>MAX_LENGTH) {
							return ;
						}	
						return (<View style={styles.history_item}>
							<Image style={styles.history_image} source={require("../../res/images/clock.png")}/>
								<Text style={styles.history_font}>{item}</Text>
							</View>)
					})
				}
				</View>
			</View>
		</View>
		</View>)
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop:64,
		backgroundColor:"rgb(250,250,250)",
		alignItems:"center",
		height:Dimensions.get('window').height
	},
	tabs: {
		marginTop:20,
		width:347,
		height:138,
		backgroundColor:"rgb(250,250,250)",
		overflow:"hidden"
	},
	tab_container: {
		flexDirection:"row",
		flexWrap:"wrap",
		marginTop:8,
	},
	tab_title:{
		fontSize:12,
		color:"gray",
		fontWeight:"100"
	},
	tab_item: {
		flexDirection:"row",
		alignItems:"center",
		paddingHorizontal:12,
		backgroundColor:"white",
		marginRight:12,
		marginBottom:12,
		height:30
	},
	tab_font:{
		fontSize:14,
		color:"gray",
		fontWeight:"400"
	},
	history: {
		marginTop:30,
		width:343
	},
	history_title: {
		marginBottom:10,
		fontSize:12,
		color:"gray",
		fontWeight:"100"
	},
	history_image: {
		width:22,
		height:22
	},
	history_item: {
		height:40,
		backgroundColor:"white",
		paddingLeft:16,
		paddingRight:18,
		flexDirection:"row",
		alignItems:"center",
		borderBottomWidth:1,
		borderBottomColor:"rgb(230,230,230)"
	},
	history_font: {
		fontSize:12,
		color:"gray",
		fontWeight:"200",
		marginLeft:16
	},
	close: {
		width:20,
		height:20,
		position:"absolute",
		top:32,
		right:15
	},
});

