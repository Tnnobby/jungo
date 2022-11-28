import { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  PanResponder,
} from "react-native";
import { useDelay } from "../../hooks/useDelay";
import { ErrorLevel } from "./types";

/**
 * onPress: Additional effect to trigger on press
 * onPressClose: close on press (default true)
 */
interface ErrorProps {
  level?: ErrorLevel;
  message?: string;
  icon?: JSX.Element;
  onPress?: () => void;
  onPressClose?: boolean;
  onClose?: () => void;
  shouldClose?: boolean;
  index?: string;
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    position: "absolute",
    top: "100%",
    backgroundColor: "#CD4949",
  },
  mainError: {
    backgroundColor: "#CD4949",
  },
  messageError: {
    color: "white",
  },
  message: {
    color: "white",
    fontFamily: "Rubik_400",
  },
});

export const Error = ({
  level,
  message,
  icon,
  onPress,
  onPressClose = true,
  onClose,
  shouldClose,
  index,
  ...props
}: ErrorProps) => {
  const offset = useRef<any>(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const setDelay = useDelay();

  // TODO Redo this to use Animated.Race in reanimated, this will allow swiping and tapping to close
  const swipeHandlers = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gs) => {
      return gs.dy > 0 || Math.abs(gs.dx) > 10;
    },
    onPanResponderGrant: (e, gs) => {
      offset.setOffset({ x: offset.x._value, y: offset.y._value });
    },
    onPanResponderMove: Animated.event([null, { dy: offset.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gs) => {
      console.log({ ...offset.y });
      Animated.spring(offset, {
        toValue: {
          x: 0,
          y: 0,
        },
        speed: 20,
        bounciness: 12,
        useNativeDriver: true,
      }).start(offset.flattenOffset());
    },
  });

  const open = () => {
    Animated.spring(offset, {
      toValue: {
        x: 0,
        y: -60,
      },
      speed: 20,
      bounciness: 12,
      useNativeDriver: true,
    }).start();
  };
  const dismiss = () => {
    Animated.spring(offset, {
      toValue: {
        x: 0,
        y: 60,
      },
      speed: 40,
      bounciness: 0,
      useNativeDriver: true,
    }).start(onClose);
  };
  useEffect(() => {
    open();
    setDelay(dismiss, 3000);
  }, []);

  useEffect(() => {
    shouldClose && dismiss()
  }, [shouldClose])

  const pressHandle = () => {
    onPressClose && dismiss();
    onPress && onPress();
  };

  return (
    <Animated.View
      style={{
        ...styles.main,
        transform: [{ translateX: offset.x }, { translateY: offset.y }],
      }}
      {...swipeHandlers.panHandlers}
    >
      <Pressable onPress={pressHandle}>
        <Text style={styles.message}>{message}</Text>
      </Pressable>
    </Animated.View>
  );
};
