import { useEffect, useRef } from "react";
import { Animated, Dimensions, Keyboard, Pressable } from "react-native";

const D = {
  left: { x: -Dimensions.get("screen").width, y: 0 },
  right: { x: Dimensions.get("screen").width, y: 0 },
  top: { x: 0, y: -Dimensions.get("screen").height },
  bottom: { x: 0, y: Dimensions.get("screen").height },
  center: { x: 0, y: 0 },
};
const OUT_OPTIONS = {
  swipeDown: "bottom",
  swipeUp: "top",
  swipeLeft: "left",
  swipeRight: "right",
};

export default function Page({
  transition: transitionIn = "instant",
  style = { backgroundColor: "white" },
  onAnimationEnd,
  _onTransitionEnd,
  id,
  useAnimatedProps,
  keyboardSafe = true,
  children,
  transitionOptions,
  oldTransitions = false,
  zIndex = 0,
  ...props
}) {
  const translate = useRef(
    new Animated.ValueXY({
      x: Dimensions.get("window").width,
      y: Dimensions.get("window").height,
    })
  ).current;
  const animationEndHandle = () => {
    onAnimationEnd && onAnimationEnd();
    _onTransitionEnd && _onTransitionEnd();
  };

  // useEffect(() => {

  //   switch (transitionIn) {
  //     case "swipeUp":
  //     case "swipeFromBottom":
  //       translate.setValue(D.bottom);
  //       break;
  //     case "swipeDown":
  //     case "swipeFromTop":
  //       translate.setValue(D.top);
  //       break;
  //     case "swipeRight":
  //     case "swipeFromLeft":
  //       translate.setValue(D.left);
  //       break;
  //     case "swipeLeft":
  //     case "swipeFromRight":
  //       translate.setValue(D.right);
  //       break;
  //     case "springUp":
  //       translate.setValue(D.bottom);
  //       break;
  //     case "springDown":
  //       translate.setValue(D.top);
  //       break;
  //     case "springLeft":
  //       translate.setValue(D.right);
  //       break;
  //     case "springRight":
  //       translate.setValue(D.left);
  //       break;

  //     case "instant":
  //     default:
  //       translate.setValue({ x: 0, y: 0 });
  //   }
  //   if (transitionIn.includes("swipe")) {
  //     Animated.timing(translate, {
  //       toValue: { x: 0, y: 0 },
  //       duration: transitionTiming,
  //       useNativeDriver: true,
  //     }).start(animationEndHandle);
  //     return;
  //   }
  //   if (transitionIn.includes("spring")) {
  //     Animated.spring(translate, {
  //       toValue: { x: 0, y: 0 },
  //       useNativeDriver: true,
  //       overshootClamping: true,
  //     }).start(animationEndHandle);
  //     return;
  //   }
  // }, [transitionIn]);

  const multiplyPoint = (xyPoint, multiplier) => {
    if (multiplier < 1) {
      const _point = { x: 0, y: 0 };
      if (xyPoint.x < 0) {
        _point.x = xyPoint.x - xyPoint.x * multiplier;
      } else {
        _point.x = xyPoint.x * multiplier;
      }
      if (xyPoint.y < 0) {
        _point.y = xyPoint.y - xyPoint.y * multiplier;
      } else {
        _point.y = xyPoint.y * multiplier;
      }
      return _point;
    } else {
      return {
        x: xyPoint.x * multiplier,
        y: xyPoint.y * multiplier,
      };
    }
  };

  useEffect(() => {
    if (transitionOptions) {
      // console.log(transitionOptions);
      const {
        animateTo,
        animateFrom,
        transitionStyle,
        halfswipe,
        transitionTiming,
      } = transitionOptions;

      if (animateFrom) {
        translate.setValue(D[animateFrom]);
      }
      if (animateTo) {
        const toValue = halfswipe
          ? multiplyPoint(D[animateTo], 0.5)
          : D[animateTo];
        switch (transitionStyle) {
          case "timing":
            Animated.timing(translate, {
              toValue,
              duration: transitionTiming,
              useNativeDriver: true,
            }).start(animationEndHandle);
            break;
          case "spring":
            Animated.spring(translate, {
              toValue,
              useNativeDriver: true,
              overshootClamping: true,
            }).start(animationEndHandle);
            break;
          default:
            translate.setValue(toValue);
        }
      }
    }
  }, [transitionOptions]);

  useEffect(() => {
    if (!transitionOptions) translate.setValue(D['center'])
  }, [])

  const onPress = () => Keyboard.dismiss();
  return (
    <Animated.View
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        transform: [{ translateX: translate.x }, { translateY: translate.y }],
        position: "absolute",
        // zIndex,
        // elevation: zIndex * 5,
        backgroundColor: "white",
        ...style,
      }}
      {...props}
    >
      {!keyboardSafe ? (
        children
      ) : (
        <Pressable style={{ ...style }} onPress={onPress}>
          {children}
        </Pressable>
      )}
    </Animated.View>
  );
}
