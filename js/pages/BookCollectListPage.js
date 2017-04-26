import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	Dimensions,
	ScrollView,
	AsyncStorage,
} from "react-native";
import BookItem1 from "../common/BookItem1";
import BookItem2 from "../common/BookItem2";
import BookItem3 from "../common/BookItem3";
import CommonNav from "../common/CommonNav"
import HttpUtils from "../../HttpUtils";
const WIDTH = Dimensions.get("window").width;
const INNERWIDTH = WIDTH - 16;
const HEIGHT = Dimensions.get("window").height
const URL = "https://mie-mie.tech/lists/show_detail";

export default class BookListPage extends Component {
	constructor(props) {
		super(props);
		this.state= {
			book_list:[],
		}
	}
	componentDidMount() {
		// AsyncStorage.getItem("book_list",(error,array)=>{
		// 	if(error) {
		// 		console.log(error)
		// 	} else {
		// 		if(array) {
		// 			array = JSON.parse(array);
		// 		} else {
		// 			array = [];
		// 		}
				
		// 		array.some((d)=>{
		// 			if(d.list_name&&d.list_name===this.props.title) {
		// 				let book_list = d.book_list;
		// 				this.setState({book_list:book_list});
		// 				// alert(JSON.stringify(books))
		// 				// alert(this.props.title)
		// 				return d.list_name===this.props.title
		// 			}
		// 		});
		// 	}
		// })
		if(this.props.book_list.length>0) {
			HttpUtils.post(URL,{
			book_list:this.props.book_list,
			uid:this.props.user.uid,
			token:this.props.user.token,
			timestamp:this.props.timestamp
		}).then((result)=>{
			if(result.msg==="请求成功") {
				this.setState({book_list:result.data});
				// alert(JSON.stringify(result.data));
			} else {
				alert(result.msg);
			}
		}).catch((error)=>{
			console.log(error);
		})
		}
		
	}
	onDelete(item) {
		AsyncStorage.getItem("book_list",(error,array)=>{
			if(error) {
				alert(error)
			} else {
				if(array) {
					array = JSON.parse(array);
				} else {
					array = [];
				}
				array.some((d)=>{
					if(d.list_name&&d.list_name===this.props.title) {
						if(d.book_list==="[]") {
							d.book_list=[];
						} else {
							d.book_list = d.book_list.toString().trim().split(",");
						}
						d.book_list.some((item2,i)=>{
							// alert("item"+item2+"goal:"+item.book_id)
							if(item2==item.book_id){
								d.book_list.splice(i,1);
								if(d.book_list.length>0){
								    HttpUtils.post(URL,{
								    	book_list:d.book_list,
								    	uid:this.props.user.uid,
								    	token:this.props.user.token,
								    	timestamp:this.props.timestamp
								    }).then((result)=>{
								    	if(result.msg==="请求成功") {
								    		this.setState({book_list:[]},()=>{
								    			this.setState({book_list:result.data});
								    		});
				// alert(JSON.st    ringify(result.data));
								    	} else {
								    		alert(result.msg);
								    	}
								    }).catch((error)=>{
								    	console.log(error);
								    });
								} else {
									this.setState({"book_list":[]})
								}
								
								return true;
							}
						});
						
						return d.list_name===this.props.title
					}
				});
			}
			AsyncStorage.setItem("book_list",JSON.stringify(array),(error)=>{

					if(error) {
						alert(error)
					} else {
						
					}
			})
		})
	}
	render() {
		return <View style={styles.container} >
			<CommonNav 
			    navigator={this.props.navigator}
				title={this.props.title?this.props.title:"书单"}
				/>
			<ScrollView style={styles.item_container}>
				{
					this.state.book_list.map((item,i)=>{
						// alert(item);
						return <BookItem2
							 key={i} item={item} user={this.props.user} navigator={this.props.navigator}
							onDelete={(item,i)=>{this.onDelete(item);}}
							/>

						
					})
				}
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
		// marginLeft:8
	},
})