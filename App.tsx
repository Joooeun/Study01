import {View} from 'react-native';
import React from 'react';
import Main from './src/Main';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Map from './src/Map';

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* <Main /> */}
        <Map />
      </View>
    </SafeAreaProvider>
  );
};

export default App;
