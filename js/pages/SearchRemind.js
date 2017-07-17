import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    PropTypes,
    AsyncStorage,
    Dimensions
} from 'react-native'
import {WIDTH, INNERWIDTH,HEIGHT,getResponsiveWidth} from "../common/styles"
const history = 'history'


export default class SearchRemind extends Component {
    constructor(props) {
        super(props)
    }
    onSubmitEditing(text) {
        this.onSave(text)
        this.setState({ page: 3, text: text })
    }
    onChangeText(text) {
        let data = ['平凡', '平凡的世界', '人间失格', '陕西师范大学出版社', '太宰治']
        this.setState({ page: 2, information: data })
    }
    render() {
        return
        <View style={styles.all_container}>
            <View style={styles.result_container}>
                <SearchNav
                    placeholder={'搜索书名，作者或出版社'}
                    defaultValue={this.state.defaultValue}
                    onSubmitEditing={event => {
                        // alert(event.nativeEvent.text);
                        this.onSubmitEditing(event.nativeEvent.text)
                    }}
                    icon={
                        <TouchableOpacity
                            style={styles.close_container}
                            onPress={() => {
                                this.props.onPressClose()
                            }}
                        >
                            <Text style={styles.close}>取消</Text>
                        </TouchableOpacity>
                    }
                    textinputColor={{ backgroundColor: '#F9F9F9' }}
                    onFocus={() => {
                        this.setState({ page: 2 })
                    }}
                    onChangeText={text => {
                        this.onChangeText(text)
                    }}
                />
            </View>

            <SearchResultPage
                navigator={this.props.navigator}
                user={this.props.user}
                timestamp={this.props.timestamp}
                content={this.state.text}
                data={[
                    {
                        grade: '暂无评分',
                        title: '设计心理学4:未来设计',
                        num: 5,
                        author: '唐纳德诺曼',
                        publish: '中信出版社',
                        time: 2015,
                        picture:
                            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491754581994&di=1db59cd5fa4e2820fb04022afb517d68&imgtype=0&src=http%3A%2F%2Ffdfs.xmcdn.com%2Fgroup18%2FM09%2F4E%2F71%2FwKgJJVeWMA3iSLL6AABg7zEQtSQ734.jpg'
                    }
                ]}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    result_container: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: WIDTH,
    },
    all_container: {
        height: HEIGHT,
        backgroundColor: 'rgb(242,246,250)',
        alignItems: 'center',
        width: WIDTH,
    },
    container: {
        marginTop: 8,
        alignItems: 'center',
        height: HEIGHT,
        width:INNERWIDTH
    },
    tabs: {
        width: INNERWIDTH
    },
    tab_container: {
        borderRadius: 8,
        backgroundColor: 'white',
        width: INNERWIDTH,
        paddingLeft: 24,
        overflow: 'hidden'
    },
    tab_title: {
        fontSize: 14,
        color: 'gray',
        fontWeight: '100',
        paddingBottom: 12
    },
    tab_item: {
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 44,
        width: 336,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)'
    },
    tab_font: {
        fontSize: 14,
        width: 300,
        color: 'gray',
        fontWeight: '400'
    },
    history: {
        marginTop: 34,
        width: INNERWIDTH
    },
    history_container: {
        borderRadius: 8,
        width: INNERWIDTH,
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    history_title: {
        marginBottom: 10,
        fontSize: 14,
        color: 'gray',
        fontWeight: '100'
    },
    history_item: {
        height: 44,
        paddingLeft: 12,
        paddingRight: 18,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)'
    },
    history_font: {
        fontSize: 12,
        color: 'gray',
        fontWeight: '200',
        width: 200
    },
    history_delete: {
        marginLeft: 120
    },
    close: {
        fontSize: 17,
        color: '#FF7373',
        alignItems: 'center'
    },
    close_container: {
        height: 28,
        width: 44,
        justifyContent: 'center',
        flexDirection: 'row'
    },

    information: {
        marginTop: 64,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        width: 344,
        marginLeft: 16
    },
    information_item: {
        height: 40,
        paddingLeft: 16,
        width: getResponsiveWidth(344),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(230,230,230)'
    }
})