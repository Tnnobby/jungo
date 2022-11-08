import AnimatedLottieView from "lottie-react-native";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingOverlayState } from "../../../redux/reducers/overlayReducer";

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    backgroundColor: "#000",
    opacity: 0.2,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  loadingText: {
    fontSize: 18,
    fontFamily: "Rubik_500",
  },
  loadingAnimation: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  loadingElement: {
    borderRadius: 100,
    backgroundColor: "black",
    height: 14,
    width: 14,
    marginHorizontal: 3
  },
  loadingBody: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'
    // backgroundColor: 'red'
  },
});

export default function LoadingOverlay() {
  const animateOpacity = useRef(new Animated.Value(0)).current;
  const {overlay, state} = useSelector((s) => s.overlay)
  const dispatch = useDispatch();

  useEffect(() => {
    if (state === 'close_loading') {
      Animated.timing(animateOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start(() => dispatch(setLoadingOverlayState('idle')))
    }
    if (state === 'open_loading') {
      Animated.timing(animateOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false
      }).start(() => dispatch(setLoadingOverlayState('open')))
    }
  }, [state])

  return (
    <Animated.View style={{...styles.main, opacity: animateOpacity}}>
      <View style={styles.bg} />
      <View style={styles.loadingBody}>
        <AnimatedLottieView
          autoPlay={true}
          style={{
            height: 100,
            width: 100,
          }}
          source={require('../../lottie/loading.json')}
        />
      </View>
    </Animated.View>
  );
}
