import React, {Component} from "react";
import {
	View,
	StyleSheet,
	StatusBar,
	Dimensions,
} from "react-native";
import ScrollableTabView, {ScrollableTabBar,DefaultTabBar}from "react-native-scrollable-tab-view";
import BookList from "../common/BookList";

export default class SearchResultPage extends Component {
	constructor(props) {
		super(props);

	}
	render() {
		return <View style={styles.container}>
		    
			<ScrollableTabView
				style={styles.scrollable_tab_view}
		    renderTabBar={
		    	()=><DefaultTabBar style={styles.scrollable}/>
		    }
		    tabBarInactiveTextColor={"#CDD8E2"}
		    tabBarActiveTextColor={"#73C0FF"}
		    tabBarUnderlineStyle={styles.active_tag}
		    tabBarTextStyle = {
		    	{
		    		fontSize:14,
		    		fontFamily:"PingFang SC"
		    	}
		    }
		    >
			<View style={styles.page_container} tabLabel="书名"><BookList navigator={this.props.navigator} styles={styles.booklist}/></View>
			<View style={styles.page_container} tabLabel="作者"><BookList navigator={this.props.navigator} styles={styles.booklist}/></View>
			<View style={styles.page_container} tabLabel="出版社"><BookList navigator={this.props.navigator} styles={styles.booklist}/></View>
			
		</ScrollableTabView>
		</View>
			
	}
}

styles = StyleSheet.create({
	container:{
		alignItems:"center",
		// marginTop:8,
		backgroundColor:"rgb(242,246,250)",
		// backgroundColor:""
	},
	page_container:{
		// alignItems:"center",
		backgroundColor:"rgb(242,246,250)",
		width:375,
		paddingLeft:16
	},
	scrollable_tab_view: {
		marginLeft:0,
		width:Dimensions.get("window").width,
	},
	active_tag:{
		backgroundColor:"#73C0FF",
		width:50,
		marginLeft:40,
		height:4,
		borderRadius:4
	},
	scrollable:{
		height:44,
		borderBottomLeftRadius:16,
		borderBottomRightRadius:16,
		backgroundColor:"white",
		marginLeft:8,
		width:Dimensions.get("window").width,
		color:"red",
	},
	booklist:{
		backgroundColor:"rgb(242,246,250)",
		
	}
});