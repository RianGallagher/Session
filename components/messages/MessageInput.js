import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { Icon, FormInput } from 'react-native-elements';

const { width } = Dimensions.get('window');

const MessageInput = props => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <FormInput
        containerStyle={{ marginLeft: 20, marginRight: 8 }}
        inputStyle={{
          color: '#212529',
          minHeight: 36,
          width: width - 60
        }}
        placeholder={'Your message'}
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={'#212529'}
        value={props.textMessage}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
      />
      <Icon
        containerStyle={{ marginLeft: 0 }}
        iconStyle={{ margin: 0, padding: 0 }}
        name="envelope"
        type="font-awesome"
        color={props.textMessage.length > 0 ? '#7d62d9' : '#494e57'}
        size={15}
        onPress={props.onRightPress}
      />
    </View>
  );
};
export { MessageInput };
