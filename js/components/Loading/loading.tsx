import AnimatedLottieView from "lottie-react-native";
import { useEffect } from "react";
import { useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  position: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    zIndex: 100,
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
    justifyContent: "center",
  },
  loadingElement: {
    borderRadius: 100,
    backgroundColor: "black",
    height: 14,
    width: 14,
    marginHorizontal: 3,
  },
  loadingBody: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Loading({
  onOpen = () => null,
  onClose = () => null,
  open,
}: {
  open: boolean;
  onClose?: VoidFunction;
  onOpen?: VoidFunction;
}) {
  const animateOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.timing(animateOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start(() => onOpen());
    }
    if (!open) {
      Animated.timing(animateOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [open]);

  return (
    <View style={styles.position} pointerEvents={open ? 'auto' : 'none' }>
      <Animated.View style={{ ...styles.main, opacity: animateOpacity }}>
        <View style={styles.bg} />
        <View style={styles.loadingBody}>
          <AnimatedLottieView
            autoPlay={true}
            style={{
              height: 100,
              width: 100,
            }}
            source={require("../../lottie/loading.json")}
          />
        </View>
      </Animated.View>
    </View>
    
  );
}
