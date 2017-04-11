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
import BookList from "../common/BookList";
import SearchResultPage from "./SearchResultPage";
const MAX_LENGTH = 8;

export default class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			history:[],
			history_num:0,
			defaultValue:"",
			page:1,
			information:[],
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
	onSubmitEditing(text) {
		this.onSave(text);
		this.setState({page:3});
	}
	onChangeText(text) {
		let data =["平凡的世界","平凡的生活","平凡的你"];
		this.setState({page:2,information:data});
	}
	render() {
		let content;
		if(this.state.page===1) {
			content = <View style={[styles.container,this.props.style]}>
		     <View style={styles.tabs}>
		    	<Text style={styles.tab_title}>热门搜索</Text>
		    	<View style={styles.tab_container}>
		    	    {
		    	    	this.state.history.map((item)=>{
		    		    return <View style={styles.tab_item}>
		    		        <Text style={styles.tab_font}
		    		        	onPress={
		    		        		()=>{
		    		        			this.setState({defaultValue:item,history_num:0})
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
		    						<Text 
		    							onPress={
		    		        		        ()=>{
		    		        			        this.setState({defaultValue:item,history_num:0})
		    		        		        }
		    		        	        }
		    						    style={styles.history_font}>{item}</Text>
		    					</View>)
		    			})
		    		}
		    		</View>
		    	</View>
		    </View>;
		} else if(this.state.page===2) {
			content = <View style={styles.information}>{
						this.state.information.map((item)=>{
						// this.state.history_num++;
						// if(this.state.history_num>MAX_LENGTH) {
						// 	return ;
						// }	
						return (<View style={styles.information_item}>
							<Image  source={require("../../res/images/search_image.png")}/>
								<Text 
									onPress={
				        		        ()=>{
				        			        this.setState({defaultValue:item})
				        		        }
				        	        }
								    style={styles.history_font}>{item}</Text>
							</View>)
					})
				}
				</View>;
		} else if(this.state.page===3) {
			content = <SearchResultPage
						data={[{title:"设计心理学4:未来设计",num:5,author:"唐纳德诺曼",publish:"中信出版社",time:2015,picture:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491754581994&di=1db59cd5fa4e2820fb04022afb517d68&imgtype=0&src=http%3A%2F%2Ffdfs.xmcdn.com%2Fgroup18%2FM09%2F4E%2F71%2FwKgJJVeWMA3iSLL6AABg7zEQtSQ734.jpg"}]
} />;
		}
		return (
		<View style={styles.all_container}>
		<SearchNav 
		    placeholder={"搜索书名，作者或出版社"}
		    defaultValue={this.state.defaultValue}
		    onSubmitEditing={
		    	(event)=>{
		    		// alert(event.nativeEvent.text);
		    		this.onSubmitEditing(event.nativeEvent.text);
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
		    onChangeText={
		    	(text)=>{
		    		this.onChangeText(text);
		    	}
		    }
		    />
		{content}
		</View>)
	}
}

const styles = StyleSheet.create({
	all_container: {
		// backgroundColor:"rgb(250,250,250)",
		height:Dimensions.get('window').height,
		backgroundColor:"rgb(250,250,250)",
		// alignItems:"center"
	},
	container: {
		marginTop:64,
		alignItems:"center",
		height:Dimensions.get('window').height,
		backgroundColor:"rgb(250,250,250)",
	},
	tabs: {
		paddingTop:20,
		width:347,
		height:158,
		// backgroundColor:"rgb(250,250,250)",
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
		width:343,

	},
	history_title: {
		marginBottom:10,
		fontSize:12,
		color:"gray",
		fontWeight:"100"
	},
	history_image: {
		width:21.98,
		height:21.98
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
		marginLeft:16,
		width:200
	},
	close: {
		width:20,
		height:20,
		position:"absolute",
		top:32,
		right:15
	},
	information:{
		marginTop:64,
		backgroundColor:"rgb(255,255,255)",
		alignItems:"center",
		width:344,
		// flexDirection:"row",
		marginLeft:16
		// height:Dimensions.get('window').height-64,
	},
	information_item:{
		height:40,
		paddingLeft:16,
		// paddingRight:18,
		width:344,
		flexDirection:"row",
		alignItems:"center",
		borderBottomWidth:1,
		borderBottomColor:"rgb(230,230,230)"
	},
	// search_image: {
	// 	// width:22.3,
	// 	// height:21.93
	// },
});

