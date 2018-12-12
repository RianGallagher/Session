import React, { Component } from 'react';
import { View } from 'react-native';
import { MessageAvatar } from './MessageAvatar';
import { MessageContainer } from './MessageContainer';

export default class Message extends Component {
    constructor(props) {
        super(props);
        console.log('Message constructor');
    }

    _renderMessageAvatar = () => {
        return this.props.isUser ? null : (
            <MessageAvatar
                isShow={this.props.isShow}
                uri={this.props.profileUrl}
                onPress={this.props.onPress}
            />
        )
    }

    render() {
        return (
             <View style={styles.messageViewStyle}>
                <View style={{flexDirection: this.props.isUser ? 'row-reverse' : 'row', paddingLeft: 14, paddingRight: 14, paddingTop: 4}}>
                    { this._renderMessageAvatar() }
                    <MessageContainer
                        isShow={this.props.isShow}
                        isUser={this.props.isUser}
                        nickname={this.props.nickname}
                        message={this.props.message}
                        time={this.props.time}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    messageViewStyle: {
        transform: [{ scaleY: -1 }]
    }
};
