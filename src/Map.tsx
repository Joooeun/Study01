import {View, Text, NativeModules, TouchableOpacity} from 'react-native';
import React from 'react';

const Map = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          alignSelf: 'center',
          top: 100,
          padding: 10,
        }}
        onPress={() => {
          NativeModules.Test.ShowMessage('sdfsdfsdf', 5000);
        }}>
        <Text>testf</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Map;
