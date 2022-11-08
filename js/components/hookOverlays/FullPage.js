import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  BackHandler,
  Platform,
  View,
} from "react-native";
import Page from "../../Page";
import { Header } from "../header";

const styles = StyleSheet.create({
  main: {
    // position: 'absolute',
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    // top: 0,
    // left: 0,
    zIndex: 10
  },
});

export default function FullPage({
  transitionIn,
  transitionOut,
  children,
  onClose,
  useHeader,
  ...props
}) {
  const [animateOut, setAnimateOut] = useState(null);
  const xOffset = useRef(
    new Animated.Value(Dimensions.get("screen").width)
  ).current;

  useEffect(() => {
    setOverlay();
    const unsub =
      Platform.OS === "android"
        ? BackHandler.addEventListener("hardwareBackPress", () => {
            close();
            return true;
          })
        : null;
    return () => {
      unsub && unsub.remove();
    };
  }, []);

  const setOverlay = () => {};

  const close = () => {
    setAnimateOut(transitionOut);
  };

  const setValue = (value) => {
    // Set value for overlay
  };

  const backHandle = () => close();
  const pressHandle = () => Keyboard.dismiss();

  return (
    <Page
      transition={transitionIn}
      style={styles.main}
      keyboardSafe={true}
      animateTo={animateOut}
      onAnimationEnd={animateOut && onClose}
    >
      <Pressable onPress={pressHandle}>
        {useHeader && <Header backButton={true} onBackPress={backHandle} />}
        {React.cloneElement(children, { close, setValue, ...props })}
      </Pressable>
    </Page>
  );

  // return (
  //   <Animated.View
  //     style={{
  //       ...styles.main,
  //       transform: [{ translateX: xOffset }],
  //     }}
  //   >
  //     <Pressable onPress={pressHandle}>
  //       {useHeader && <Header
  //         backButton={true}
  //         onBackPress={backHandle}
  //       />}
  //         {React.cloneElement(children, {close, setValue, ...props})}
  //     </Pressable>
  //   </Animated.View>
  // );
}
