import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ListView,
	Dimensions,
	RefreshControl
} from "react-native";
import BookItem1 from "./BookItem1";
import HttpUtils from "../../HttpUtils"

const URL = "https://mie-mie.tech/books/show_books"
const HEIGHT = Dimensions.get("window").height;


export default class BookList extends Component {
	constructor(props) {
		super(props);
		
		let data = this.props.books_data?this.props.books_data:[]
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged:(r1,r2)=>r1!==r2
			}),
			isLoading:true,
			page:1,
			books:[]
		}
		// alert(this.props.data)
	}
	componentDidMount() {
		this.onLoad();
	}
	onLoad() {
		HttpUtils.post(URL,{
			uid:this.props.user.uid,
			token:this.props.user.token,
			timestamp: this.props.timestamp,
			page:1
		}).then((result)=>{
			// alert(JSON.stringify(result));
			this.setState({books:result.data},()=>{
				this.setState({
					dataSource:this.state.dataSource.cloneWithRows(this.state.books),
					page:1
				});
			})
			this.setState({isLoading:false});
		})
		.catch((error)=>{
				console.log(error);
		});
	}
	onEndReached() {
		HttpUtils.post(URL,{
			uid:this.props.user.uid,
			token:this.props.user.token,
			timestamp: new Date().getTime(),
			page:this.state.page+1
		}).then((result)=>{
			// alert(this.state.page+1);
			// alert(JSON.stringify(this.state.books));
			this.setState({
				books:[...this.state.books, ...result.data]},()=>{
					this.setState({
						dataSource:this.state.dataSource.cloneWithRows(this.state.books),
				        page:this.state.page+1
			         });
				});
		})
		.catch((error)=>{
			console.log(error);
		});
	}
	renderRow(data) {
		return <BookItem1 timestamp={this.props.timestamp} user={this.props.user} navigator={this.props.navigator} data={data}/>;
	}
	render() {
		return <View style={[styles.booklist,this.props.style]}>
			<ListView
				onEndReached={()=>{
							this.onEndReached();
						}}
				dataSource={this.state.dataSource}
				onEndReachedThreshold={0}
				renderRow={(data)=>this.renderRow(data)}
				refreshControl = {
					<RefreshControl 
						refreshing={this.state.isLoading}
						onRefresh={()=>{
							this.onLoad();
						}}
						/>
				}
			/>
		</View>
	}
}

const styles = StyleSheet.create({
	booklist: {
		marginTop:10,
		flex:1,
		width:Dimensions.get("window").width-16,
	},
});