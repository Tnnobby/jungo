import { cloneElement, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, LayoutRectangle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface SwipeableItemProps {
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  children?: JSX.Element;
  closed?: boolean;
}

export default function SwipeableItem({
  leftElement,
  rightElement,
  children,
  closed,
}: SwipeableItemProps) {
  const [layout, setLayout] = useState<LayoutRectangle>(null);
  const [loaded, setLoaded] = useState<boolean>(false)
  const leftButtonLayout = useSharedValue<LayoutRectangle>(null);
  const rightButtonLayout = useSharedValue<LayoutRectangle>(null);
  const xOffset = useSharedValue<number>(0);
  const offset = useSharedValue(0);

  const swipeGesture = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate((ev) => {
          if (closed || !layout) return;
          let amnt: number = ev.translationX + xOffset.value;
          if (ev.translationX > 0 && leftButtonLayout.value) {
            // Moving right
            amnt = Math.min(
              ev.translationX + xOffset.value,
              leftButtonLayout.value.width - leftButtonLayout.value.x
            );
          } else if (ev.translationX < 0 && rightButtonLayout.value) {
            // Moving left
            const shouldStop =
              ev.translationX + xOffset.value + layout.width <
              rightButtonLayout.value.x;
            amnt = shouldStop
              ? -rightButtonLayout.value.width
              : ev.translationX;
          }

          offset.value = amnt;
        })
        .onEnd((ev) => {
          if (
            Boolean(leftButtonLayout.value) &&
            ev.translationX >= leftButtonLayout.value.width
          ) {
            xOffset.value = leftButtonLayout.value.width;
            return;
          }
          if (
            Boolean(rightButtonLayout.value) &&
            Boolean(layout) &&
            ev.translationX + xOffset.value + layout.width <
              rightButtonLayout.value.x
          ) {
            xOffset.value = -rightButtonLayout.value.width;
            return;
          }
          offset.value = withSpring(0, { mass: 0.5 });
          xOffset.value = 0;
        }),
    [closed, layout]
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (closed && xOffset.value !== 0) {
      offset.value = withSpring(0, { mass: 0.5 });
      xOffset.value = 0;
    }
  }, [closed]);

  const layoutHandle = (ev) => {
    setLayout(ev.nativeEvent.layout);
  };
  const leftLayoutHandle = (ev) => {
    leftButtonLayout.value = ev.nativeEvent.layout;
  };
  const rightLayoutHandle = (ev) => {
    rightButtonLayout.value = ev.nativeEvent.layout;
  };

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <Animated.View entering={loaded ? SlideInLeft : undefined } exiting={SlideInRight}>
      {layout && (
        <Animated.View
          style={
            layout && {
              position: "absolute",
              height: layout.height,
              width: layout.width,
            }
          }
          pointerEvents="auto"
        >
          {leftElement &&
            cloneElement(leftElement, { onLayout: leftLayoutHandle })}
          {rightElement &&
            cloneElement(rightElement, { onLayout: rightLayoutHandle })}
        </Animated.View>
      )}
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={animatedStyles}>
          {cloneElement(children, { onLayout: layoutHandle })}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
