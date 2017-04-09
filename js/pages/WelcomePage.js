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
import ShareNav from "../common/ShareNav";
import BottomTabs from "../common/BottomTabs";
import SearchNav from "../common/SearchNav"
import BookList from "../common/BookList";

export default class WelcomePage extends Component {

	// loadData() {
	// 	let url = "";
	// 	this.dataR
	// }
	render() {
		return (
		    // <ShareNav/>
		    // <BottomTabs/>
		    	
		        <BottomTabs
		        	page1 = {
		        		<View style={styles.container}>
		        			<SearchNav style/>
		        			<BookList style={styles.booklist}/>
		        		</View>
		        	}
		        />
		    
		)
	}
}

const styles = StyleSheet.create({
	conatiner:{
		flex:1,
		flexDirection:"column",
	},
});
