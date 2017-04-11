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
import SearchPage from "./SearchPage";

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
		return (
			<BottomTabs
			    page1 = {
			    	<View style={styles.container}>
			    	    {
			    	    	this.state.show===1?
			    	    	<View>
			    	    	<SearchNav placeholder={"搜索"} 
			    	    	    onFocus = {
			    	    	    	()=>{
			    	    	    		this.setState({show:2});
			    	    	    	}
			    	    	    }/> 
			    	    	  <BookList/>
			    	    	  </View>
			    	    	: <SearchPage
			    	    	    onPressClose={
			    	    	    	()=>{
			    	    	    		this.setState({show:1});
			    	    	    	}
			    	    	    }
			    	    	  />
			    	    }
			    	    
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
