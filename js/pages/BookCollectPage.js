import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Dimensions,
	TouchableHighlight,
	AsyncStorage,
	ScrollView,
} from "react-native";
import RightButtonNav from "../common/RightButtonNav";
import BookCollectItem from "../common/BookCollectItem";
import BookCollectAddPage from "./BookCollectAddPage";
import HttpUtils from "../../HttpUtils";
const INNERWIDTH = Dimensions.get("window").width - 16;
const HEIGHT = Dimensions.get("window").height;
const URL = "https://mie-mie.tech/lists/show_list"; 
const URL_ADD_BOOK = "https://mie-mie.tech/lists/collect_book";


export default class BookCollectPage extends Component{
	constructor(props) {
		super(props)
		this.state = {
			lists:[],
			choosed:[]
		}
		
		
	}
	static defaultProps = {
		book:{
			book_title:"美洲小宇宙",
			book_content:"一本书带你深度探访中南美洲腹地，身未动，心已远。沿着旧地图，走不到新大陆，毕淑敏带你走出自助旅行新路线: “世界最美岛屿”加拉帕戈斯群岛，“热带雾林王冠上的宝石”哥斯达黎加蒙特维德雾林，古印第安人的太阳、月亮金字塔与亡灵大道，全球银饰之都塔斯科，切•格瓦拉故居……太多秘密，等你探索，太多奇迹，等你发现。",
			book_cover:"https://imgsa.baidu.com/baike/c0%3Dbaike272%2C5%2C5%2C272%2C90/sign=b52bcf617f094b36cf9f13bfc2a517bc/9c16fdfaaf51f3de300988da9deef01f3b2979d0.jpg",
			book_key:"TB47-05-/9",
			book_place:"中文文科库(418)",
			book_author:"毕淑敏",
			book_publish:"湖南文艺出版社",
			book_rate:9.3,
			detail_data:[
			    {detail_place:"中文文科库418",detail_id:11,detail_key:1,detail_in:true},
			    {detail_place:"中文文科库418",detail_id:11,detail_key:2,detail_in:true},
			    {detail_place:"中文文科库418",detail_id:11,detail_key:3,detail_in:false}
			],
			book_last_number:2,
			book_subscribe:true
		}
	}
	componentDidMount() {
		// AsyncStorage.removeItem("book_list",(error,array)=>{})
		AsyncStorage.getItem("book_list",(error,array)=>{
			let lists = [];
			array = JSON.parse(array)
			if(array&&array.length!=0) {
				lists = array;
				this.setState({lists:lists});
			} else {
				HttpUtils.post(URL, {
					token:this.props.user.token,
					uid:this.props.user.uid,
					timestamp:this.props.timestamp
				}).then((result)=>{
					lists = result.data;
					this.setState({lists:lists});
					 AsyncStorage.setItem("book_list",JSON.stringify(lists),(error)=>{
					     if(error) {
					     		console.log(error)
					     } 
					 });
				}).catch((error)=>{
					console.log(error);
				});
			}
			
		});
	}
	rightOnPress() {
		if(this.props.title==="我的书单") {
			this.props.navigator.pop();
			return ;
		}
		AsyncStorage.getItem("book_list",(error,array)=>{
			if(error) {
				alert(error)
			} else {
				if(array) {
					array = JSON.parse(array);
				} else {
					array = [];
				}
				this.state.choosed.map((item)=>{
					array.some((d)=>{
						if(d.list_name&&d.list_name===item) {
							if(d.book_list==="[]") {
								d.book_list=[];
							} else {
								d.book_list = d.book_list.toString().trim().split(",");
							}
							
							if(!d.book_list) {
								d.book_list = [];
							}
							if(!d.book_list.some) {
								// alert(d.book_list);
								return false;
							}
							
							let book_list = d.book_list;
							// alert(JSON.stringify(d))
							// alert(this.props.book)
							let flag = false;
							d.book_list.some((item,i)=>{
								if(item==this.props.book.book_id){
									// alert(d.list_name+"书单已经收藏过这本书啦！");
									this.props.navigator.pop();
									return flag = true;
								}
							});
							
							// alert(d.book_list);
							if(!flag) {
								d.book_list = [...d.book_list,this.props.book.book_id];
								HttpUtils.post(URL_ADD_BOOK,{
					                timestamp:this.props.timestamp,
					                uid:this.props.user.uid,
					                token:this.props.user.token,
					                list_id:d.list_id,
					                book_list:d.book_list.join(","),
							    }).then((result)=> {
							    	// alert(result.msg);
							    	// alert(result.msg)
							    	if(result.msg=="请求成功") {
							    		HttpUtils.post(URL, {
											token:this.props.user.token,
											uid:this.props.user.uid,
											timestamp:this.props.timestamp
										}).then((result)=>{
											// alert(result.msg);
											if(result.msg==="请求成功"){
												let lists = result.data;
											    this.setState({lists:lists});
											    // alert(JSON.stringify(lists));
											    AsyncStorage.setItem("book_list",JSON.stringify(lists),(error)=>{
											    	if(error) {
											    			alert(error)
											    	} else {
											    			this.props.navigator.pop()
											    		}
											});
										    }
										}).catch((error)=>{
											console.log(error);
										});
							    		
							    	}
							    }).catch((error)=>{
							    	console.log(error);
							    })
							    ;
							}
							return d.list_name===item.list_name;
						}
					})
				});

				
			}
		})
	}
	onPressButton(select,item) {
		let choosed = this.state.choosed
		if(select) {
			choosed = [...new Set([...choosed,item.list_name])]
		}  else {
			choosed.splice(choosed.indexOf(item.list_name),1)
		}
		this.setState({choosed:choosed})
	}
	onDelete(title) {
		AsyncStorage.getItem("book_list",(error,array)=>{
			if(error) {
				alert(error)
			} else {
				array = JSON.parse(array)
				array.some((d,i)=>{
					if(d.list_name===title) {
						// array.splice(i,1)
						array = array.splice(i,1)
					}
					this.setState({lists:[]},()=>{
						this.setState({lists:array});
					})
					// alert(this.state.lists)
					return d.list_name === title
				})
			}
			AsyncStorage.setItem("book_list",JSON.stringify(array),(error)=>{
					if(error) {
						alert(error)
					} else {
						// alert("成功!")
					}
			})
		})
	}
	render() {
		let lists = [
		    {title:"专业书籍",des:"反正就是很专业的啦"},
		    {title:"经典书籍",des:"反正就是很经典的啦"}
		]
		return <View style={styles.container}>
			<RightButtonNav navigator={this.props.navigator}
				title={this.props.title}
				rightOnPress={
					()=>this.rightOnPress()
				}/>
			<TouchableOpacity style={styles.add}
				onPress={
					()=>{
						this.props.navigator.push({
							component:BookCollectAddPage,
							params:{
								onCallBack:()=> {
									AsyncStorage.getItem("book_list",(error,array)=>{
		                        	array = JSON.parse(array);
		                        	this.setState({lists:array})
		                        })
								},
								user:this.props.user,
					            timestamp:this.props.timestamp
							}
						})
					}
				}
			    >
				<Image source={require("../../res/images/icon_add.png")}/>
			</TouchableOpacity>
			{
			// <BookCollectList
			//      data = {this.state.lists}
			// 	 style={styles.list}
			// 	 onPressButton={(select,data)=>{
			// 	 	this.onPressButton(select,data)
			// 	 }}
			// 	 onDelete={(title)=>{
			// 	 	this.onDelete(title)
			// 	 }}
			// 	/>
			
			}
				<ScrollView style={styles.list}>
				{
				this.state.lists.map((item,i)=>{
					// if(item===null) {
					// 	return;
					// }
					// alert(item.book_list);
					return <BookCollectItem 
						title={item.list_name}
						big_title={this.props.title}
						navigator={this.props.navigator}
						onPress = {(select, data)=>this.onPressButton(select,data)}
						onDelete={(title)=>{
							this.onDelete(title)
			 			}}
			 			timestamp={this.props.timestamp}
			 			user={this.props.user}
					    key={i} data={item}/>
				})
			    }
			</ScrollView>
		</View>
	}
}	

const styles = StyleSheet.create({
	container:{
		backgroundColor:"rgb(242,246,250)",
		height:HEIGHT
	},
	add: {
		width:INNERWIDTH,
		borderRadius:8,
		marginLeft:8,
		height:48,
		marginTop:8,
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:"white"
	},
	list: {
		marginTop:20,
		// marginLeft:8
	}

});