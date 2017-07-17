import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    PropTypes,
    AsyncStorage,
} from 'react-native'
import {WIDTH, INNERWIDTH,HEIGHT, getResponsiveWidth,getResponsiveHeight} from "../common/styles"
const history = 'history'

export default class SearchNav extends Component {
    constructor(props) {
        super(props)
        // this.state = {

        // }
    }

    static defaultProps = {
        onChangeText: text => {
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TextInput
                    style={[styles.textInput, this.props.textInputColor]}
                    placeholder={this.props.placeholder}
                    placeholderColor={'rgb(165,165,165)'}
                    defaultValue={this.props.defaultValue}
                    onChangeText={text => {
                        this.props.onChangeText(text)
                    }}
                    onFocus={() => {
                        if (this.props.onFocus) {
                            this.props.onFocus()
                        }
                    }}
                    clearButtonMode={'while-editing'}
                    onSubmitEditing={event => {
                        if (this.props.onSubmitEditing) {
                            this.props.onSubmitEditing(event)
                        }
                    }}
                />
                <Image
                    style={styles.image_search}
                    source={require('../../res/images/search_image.png')}
                />
                <TouchableOpacity
                    style={styles.close_container}
                    onPress={() => {
                        Actions.pop()
                    }}
                >
                    <Text style={styles.close}>取消</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: getResponsiveHeight(36),
        paddingTop: getResponsiveHeight(28),
        width: WIDTH,
        paddingLeft: getResponsiveWidth(8),
        height:64
    },
    show: {
        display: 'flex'
    },
    hide: {
        display: 'none'
    },
    image_search: {
        borderRadius: 0,
        position: 'absolute',
        left:getResponsiveWidth(16),
        top: getResponsiveHeight(36),
        zIndex: 2
    },
    textInput: {
        width: getResponsiveWidth(316),
        height: getResponsiveHeight(28),
        paddingLeft: getResponsiveWidth(30),
        backgroundColor: 'white',
        borderRadius: getResponsiveHeight(8),
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 14
    },
    close_container: {
        height:getResponsiveHeight(24),
        width: getResponsiveWidth(44),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    close: {
        fontSize: getResponsiveWidth(17),
        color: '#FF7373',
        alignItems: 'center'
    },

})
