import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export const MovingBall = () => {
  const xValue = useSharedValue(0);
  const yValue = useSharedValue(0);
  const handleGesture = useAnimatedGestureHandler({
    onStart:(e,c) => {
      c.startX = xValue.value;
      c.startY = yValue.value;
    },
    onActive:(e,c) => {
      xValue.value = c.startX + e.translationX;
      yValue.value = c.startY + e.translationY;
    },
    onEnd:(e,c) => {
      xValue.value = c.startX + e.translationX;
      yValue.value = c.startY + e.translationY;
    }
  })

  const arr = [1,2,3,4,5,6,3,4,6,2,1,1,2,3,4,5,3,3,3,3]
  const result = arr.reduce((acc,e) => {
   if(!acc.includes(e))
      acc.push(e)
    return acc
  },[])
  console.log(result)

  const animatedStyle = useAnimatedStyle(() => {
    return{
      transform:[{translateX: xValue.value}, {translateY: yValue.value}]
    }
  })
  return(
    <GestureHandlerRootView>
      
      <View style={styles.main}>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View style={[styles.ball, animatedStyle]}/>
        </PanGestureHandler>
      </View>
      
    </GestureHandlerRootView>
  ); 
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  ball: {
    height: 100,
    width: 100,
    backgroundColor: '#A83670',
    borderRadius: 50,
  }
});