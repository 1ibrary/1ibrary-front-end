import React, {Component} from "react";
import {
	View,
	StyleSheet,
	Text,
	Navigator,
	TouchableOpacity,
	Image,
	ListView
} from "react-native";
// import ShareNav from "../common/ShareNav";
import BottomTabs from "../common/BottomTabs";
import SearchNav from "../common/SearchNav"
import BookList from "../common/BookList";
import SearchPage from "./SearchPage";
import SearchResultPage from "./SearchResultPage";
import SearchNav_Welcome from "../common/SearchNav_Welcome";
import BookInfoPage from "./BookInfoPage";


export default class WelcomePage extends Component {
	constructor(props) {
		super(props);
		this.state={
			show:2
		}
	}

	// loadData() {
	// 	let url = "";
	// 	this.dataR
	// }
	render() {
		// return <BottomTabs
		// page1 = {
		// 	<View style={styles.container}>
		// 	{
		// 		this.state.show===1?
		// 		<View>
		// 		<SearchNav_Welcome placeholder={"搜索"} 
		// 		onFocus = {
		// 			()=>{
		// 				this.setState({show:2});
		// 			}
		// 		}/> 
		// 		<BookList/>
		// 		</View>
		// 		: <SearchPage
		// 		onPressClose={
		// 			()=>{
		// 				this.setState({show:1});
		// 			}
		// 		}
		// 		/>
		// 	}
		// 	</View>
		// }/>
		return <BookInfoPage />
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
	}
});
