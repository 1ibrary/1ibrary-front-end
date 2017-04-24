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
	ScrollView
} from "react-native";
// import ShareNav from "../common/ShareNav";
import BottomTabs from "../common/BottomTabs";
import SearchNav from "../common/SearchNav"
import BookList from "../common/BookList";
import SearchPage from "./SearchPage";
import SearchResultPage from "./SearchResultPage";
import SearchNav_Welcome from "../common/SearchNav_Welcome";
import BookInfoPage from "./BookInfoPage";
import BookCollectPage from "./BookCollectPage";
import BookCollectAddPage from "./BookCollectAddPage";
import MessagePage from "./MessagePage";
import ProfilePage from "./ProfilePage";
// import HttpUtils from "../../HttpUtils"

const HEIGHT = Dimensions.get("window").height;


export default class WelcomePage extends Component {
	constructor(props) {
		super(props);
		this.state={
			show:1
		}

	}

	// loadData() {
	// 	let url = "";
	// 	this.dataR
	// }
	render() {
		return <BottomTabs
		page1 = {
			<View style={styles.container}>
			{
				this.state.show===1?
				<View style={styles.list}>
				<SearchNav_Welcome placeholder={"搜索"} 
				
				onFocus = {
					()=>{
						this.setState({show:2});
					}
				}/> 
				<BookList 
					data = {this.props.books_data?this.props.books_data:[]}
					user = {this.props.user?this.props.user:{}}
				    navigator={this.props.navigator}/>
				</View>
				: <SearchPage
				navigator={this.props.navigator}
				onPressClose={
					
					()=>{
						this.setState({show:1});
					}
				}
				/>
			}
			</View>
		}
		page2 = {
			<MessagePage
				navigator={this.props.navigator}
			/>
		}
		page3 = {
			<ProfilePage 
				user_name = {this.props.user&&this.props.user.user_name?this.props.user.user_name:""}
				navigator={this.props.navigator}/>
		}
		/>
		// return <BookCollectPage />

	}
}

const styles = StyleSheet.create({
	container:{
		// flex:1,
		flexDirection:"column",
		alignItems:"center",
		backgroundColor:"rgb(242,246,250)",
		alignItems:"center"
	},
	top: {
		height:28,
		backgroundColor:"white",
		marginTop:-28,
		width:375
	},
	search_result_bar: {
		// paddingTop:28,
		backgroundColor:"white",
	},
});