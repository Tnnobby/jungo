import React, { useEffect, useRef, useMemo } from "react";
import {
  Dimensions,
  Keyboard,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Animated } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    top: 0,
    left: 0,
    zIndex: 100
  },
  backdrop: {
    position: "relative",
    backgroundColor: "#909090",
    height: "100%",
    width: "100%",
  },
  main: {
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    paddingTop: 15,
    flexDirection: "column",
    width: "100%",
    left: 0,
    alignItems: "center",
  },
  dragIcon: {
    width: 80,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#909090",
    opacity: 0.4,
    marginBottom: 10,
  },
});

/**
 * Required: value, _onClose
 * @param param0
 * @returns
 */
export default function Bedsheet({
  _onClose,
  onClose,
  onCancel,
  onChange,
  children,
  ...props
}: {
  _onClose: Function;
  onClose?: Function;
  onCancel?: (message?: any) => void
  onChange?: Function;
  children?: any;
}) {
  const bedsheetBottom = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  const yOffset = useRef(new Animated.Value(0)).current;

  const bedsheetResponder = useRef(
    PanResponder.create({
      onPanResponderGrant: () => null,
      onMoveShouldSetPanResponder: (ev, gs) => {
        if (Math.abs(gs.vx) < Math.abs(gs.vy)) {
          return true;
        } else {
          return false;
        }
      },
      onPanResponderMove: Animated.event([null, { dy: bedsheetBottom }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (ev, gs) => {
        if ((gs.dy > 150 && gs.vy > 1) || gs.vy > 1) close();
        else set();
      },
      onPanResponderTerminationRequest: () => false,
    })
  ).current;

  useEffect(() => {
    set();
    const _showListener = Keyboard.addListener("keyboardDidShow", (ev) => {
      Animated.timing(yOffset, {
        toValue: -ev.endCoordinates.height,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
    const _hideListener = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(yOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      _showListener.remove();
      _hideListener.remove();
    };
  }, []);

  const set = () => {
    Animated.timing(bedsheetBottom, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const closeBedsheet = (onEnd?: () => void) => {
    Animated.parallel([
      Animated.timing(bedsheetBottom, {
        toValue: Dimensions.get("window").height,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(yOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start(() => onEnd());
  }

  const close = () => {
    closeBedsheet(() => {
      console.log('in close')
      _onClose()
      onClose && onClose()
    })
  };

  const cancel = () => {
    console.log('in cancel')
    closeBedsheet(() => {
      _onClose()
      onCancel && onCancel()
    })
  }

  const tapOutHandle = close;

  const attributes = useMemo(() => {
    const _attr = {
      close,
      cancel
    };

    if (onChange) _attr['onChange'] = onChange
    return _attr;
  }, [onChange]);

  return (
    <Animated.View>
      <Pressable onPress={tapOutHandle}>
        <Animated.View
          style={{
            ...styles.backdrop,
            opacity: bedsheetBottom.interpolate({
              inputRange: [0, Dimensions.get("window").height],
              outputRange: [0.4, 0],
            }),
          }}
        ></Animated.View>
      </Pressable>
      <Animated.View
        style={{
          ...styles.main,
          bottom: bedsheetBottom.interpolate({
            inputRange: [0, Dimensions.get("screen").height],
            outputRange: [0, -Dimensions.get("screen").height],
            extrapolateLeft: "clamp",
          }),
          transform: [{ translateY: yOffset }],
        }}
        {...bedsheetResponder.panHandlers}
      >
        <View style={styles.dragIcon} />
        {React.cloneElement(children, attributes)}
      </Animated.View>
    </Animated.View>
  );
}
