import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  closeOverlay,
  setOverlayValue,
} from "../../redux/reducers/overlayReducer";
import Header from "./header";

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    top: 0,
    left: 0,
  },
});

export default function NewFullPageOverlay({
  children,
  swipeable,
  openTransition = 'swipeRight',
  closeTransition = 'swipeLeft',
  swipeClose = false,
  ...props
}) {
  const transition = useRef(
    new Animated.ValueXY({x: Dimensions.get("screen").width, y: Dimensions.get('screen').height})
  ).current;
  const dispatch = useDispatch();
  const { value, id } = useSelector((state) => state.overlay);

  useEffect(() => {
    setOverlay();
  }, []);

  const setOverlay = () => {
    switch(openTransition) {
      case 'swipeRight':
      case 'springRight':
        transition.setValue({x: -Dimensions.get('screen').width, y: 0});

      case 'swipeLeft':
      case 'springLeft':
        transition.setValue({x: Dimensions.get('screen').width, y: 0});

      case 'springDown':
      case 'swipeDown':
        transition.setValue({x: 0, y: -Dimensions.get('screen').height});

      case 'springUp':
      case 'swipeUp':
        transition.setValue({x: 0, y: Dimensions.get('screen').height});

      
      case 'instant':
      case 'none':

        break;
      
      default:
        if (openTransition.includes('spring')) {
          Animated.spring(transition, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true
          })
        } else {
          Animated.timing(transition, {
            toValue: {x: 0, y: 0},
            duration: 200,
            useNativeDriver: true
          }).start()
        }
    }
  };

  const close = () => {
    Animated.timing(transition, {
      toValue: Dimensions.get("screen").width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      dispatch(closeOverlay());
    });
  };

  const setValue = (value) => {
    dispatch(setOverlayValue(value));
  };

  const backHandle = () => close();
  const pressHandle = () => Keyboard.dismiss();

  return (
    <Animated.View
      style={{
        ...styles.main,
        transform: [{ translateX: transition }],
      }}
    >
      <Pressable onPress={pressHandle}>
        <Header backButton={true} onBackPress={backHandle} />
        {value &&
          React.cloneElement(children, {
            close,
            setValue,
            initialValue: value,
            id,
          })}
      </Pressable>
    </Animated.View>
  );
}
