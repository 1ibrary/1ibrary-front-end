import React, {Component} from "react";
import {
	View,
	StyleSheet,
} from "react-native";
import ScrollableTabView, {ScrollableTabBar}from "react-native-scrollable-tab-view";
import BookList from "../common/BookList";

export default class SearchResultPage extends Component {
	constructor(props) {
		super(props);

	}
	render() {
		return <BookList
		    data={this.props.data?this.props.data:[]}/>
	}
}