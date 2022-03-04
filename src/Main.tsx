import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const sh = Dimensions.get('window').height / 422;
const Main = () => {
  const [shadow, setshadow] = useState(true);
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          backgroundColor: '#3453ff',
          height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        }}>
        <StatusBar
          translucent
          backgroundColor="#3453ff"
          barStyle="light-content"
        />
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent: e}) => {
          e.layoutMeasurement.height + e.contentOffset.y >=
          e.contentSize.height - 5
            ? setshadow(false)
            : setshadow(true);
        }}
        scrollEventThrottle={16}>
        <View style={{flex: 1}}>
          <View style={{backgroundColor: '#3453ff', height: 75 * sh}} />
          <Carousel />

          <StoreItem color="#eceeff" num={1} />
          <StoreItem num={2} />
          <StoreItem color="#eceeff" num={3} />
          <StoreItem num={4} />
          <StoreItem color="#eceeff" num={3} />
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: 50 + insets.bottom,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: shadow ? 0.1 : 0,
          shadowRadius: 2,
          elevation: 8,
        }}></View>
    </>
  );
};

const StoreItem = ({color = '#fff', num}: {color?: string; num: number}) => {
  const item = ['1', '2', '4', '5', '6', '7'];
  return (
    <View style={{backgroundColor: color, height: 109 * sh, padding: 20}}>
      <Text style={{marginBottom: 20}}>매장명{num}</Text>
      <FlatList
        data={item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                aspectRatio: 1,
                width: 70,
                backgroundColor: '#fff',
                margin: 5,
              }}>
              <Text>{index}</Text>
            </View>
          );
        }}
        horizontal={true}
      />
    </View>
  );
};

const Carousel = () => {
  const item: number[] = [1, 2, 3, 4, 5, 6];
  const [current, setcurrent] = useState(1);
  const ref = useRef();

  const [timer, settimer] = useState(5);

  useEffect(() => {
    if (timer === 0) {
      return;
    }
    setTimeout(() => {
      settimer(timer - 1);
    }, 1000);
  }, [timer]);

  useEffect(() => {
    if (timer > 0) {
      return;
    }

    setTimeout(() => {
      ref.current.scrollToOffset({
        offset: (current === 6 ? 0 : current) * Dimensions.get('window').width,
        animated: true,
      });
      settimer(5);
    }, 2000);
  }, [timer, current]);

  return (
    <View
      style={{
        position: 'relative',
      }}>
      <FlatList
        ref={ref}
        horizontal={true}
        style={{
          backgroundColor: '#ffe7e2',
          height: 136 * sh,
          width: Dimensions.get('window').width,
        }}
        data={item}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        onTouchStart={() => {
          settimer(5);
        }}
        onScroll={({nativeEvent: e}) => {
          let contentOffset = e.contentOffset;
          let viewSize = e.layoutMeasurement;

          // Divide the horizontal offset by the width of the view to see which page is visible
          let pageNum = Math.floor(contentOffset.x / viewSize.width) + 1;

          settimer(5);
          setcurrent(pageNum);
        }}
        renderItem={({item}) => {
          return (
            <View
              style={{
                borderWidth: 1,
                borderColor: 'red',
                width: Dimensions.get('window').width,
              }}>
              <Text style={{color: 'black'}}>{item}</Text>
            </View>
          );
        }}></FlatList>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 10,
          left: 10,
        }}>
        {item.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: current === item ? 'black' : 'grey',
                height: 3,
                width: 15,
                marginLeft: 3,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Main;
