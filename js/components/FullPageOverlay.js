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
import { Header } from "./header";

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

export default function FullPageOverlay({ children, ...props }) {
  const xOffset = useRef(
    new Animated.Value(Dimensions.get("screen").width)
  ).current;
  const dispatch = useDispatch();
  const { value, id } = useSelector((state) => state.overlay);

  useEffect(() => {
    setOverlay();
  }, []);

  const setOverlay = () => {
    Animated.timing(xOffset, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(xOffset, {
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
        transform: [{ translateX: xOffset }],
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
