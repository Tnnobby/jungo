import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Animated, Pressable } from "react-native";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function StatefulPressable({
  children,
  onPressIn,
  onPressOut,
  pressingStyle = {},
  style,
  animatedState,
  animatedMethod = 'timing',
  animatedDuration = 200,
  ...props
}) {
  const [isPressing, setIsPressing] = useState(false);
  // const [animatedStyle, setAnimatedStyle] = useState({});
  // const [animatedActions, setAnimatedActions] = useState({});
  // const animatedRef = useRef(new Animated.Value(0)).current;

  const pressInHandle = () => {
    setIsPressing(true);
    onPressIn && onPressIn();
  };
  const pressOutHandle = () => {
    setIsPressing(false);
    onPressOut && onPressOut();
  };

  // useEffect(() => {
  //   if (animatedState) {
  //     for (let i = 0; i < animatedState.length; i++) {
  //       const {style: property, outputRange, } = animatedState[i];
  //       setAnimatedStyle((prev) => {
  //         const _r = prev;
  //         _r[property] = animatedRef.interpolate({inputRange: [0, 1], outputRange});
  //         return _r
  //       })
  //     }
  //   }
  // }, [])

  return (
    <Pressable
      onPressIn={pressInHandle}
      onPressOut={pressOutHandle}
      style={isPressing ? { ...style, ...pressingStyle } : {...style}}
      {...props}
    >
      {children}
    </Pressable>
  );
}
