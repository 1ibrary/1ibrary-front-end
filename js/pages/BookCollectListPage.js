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
const WIDTH = Dimensions.get("window").width;
const INNERWIDTH = WIDTH - 16;
const HEIGHT = Dimensions.get("window").height

export default class BookListPage extends Component {
	constructor(props) {
		super(props);
		this.state= {
			books:[],
		}
	}
	componentDidMount() {
		AsyncStorage.getItem("book_list",(error,array)=>{
			if(error) {
				console.log(error)
			} else {
				if(array) {
					array = JSON.parse(array);
				} else {
					array = [];
				}
				
				array.some((d)=>{
					if(d.title&&d.title===this.props.title) {
						let books = d.books
						this.setState({books:books})
						// alert(JSON.stringify(books))
						// alert(this.props.title)
						return d.title===this.props.title
					}
				});
			}
		})
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
					if(d.title&&d.title===this.props.title) {
						d.books.some((item2,i)=>{
							if(item2.book_id===item.book_id){
								d.books.splice(i,1);
								let books = d.books;
								this.setState({books:books});	
								return true;
							}
						});
						// alert(JSON.stringify(books))
						// alert(this.props.title)
						
						return d.title===this.props.title
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
					this.state.books.map((item,i)=>{
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