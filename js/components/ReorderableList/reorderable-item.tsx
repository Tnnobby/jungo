import { LayoutRectangle, StyleSheet, LayoutChangeEvent } from "react-native";
import Animated, {
  Layout,
  SlideInLeft,
  SlideInRight,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ReorderableManager } from "./useReorderableManager";
import useWrappedManager from "./useWrappedManager";

export type ReorderableItemProps = {
  children?: React.ReactNode;
  onMove?: (id: string) => void;
  onMoveEnd?: (id: string) => void;
  id: string;
  manager?: ReorderableManager;
};

export default function ReorderableItem({
  children,
  onMove,
  onMoveEnd,
  id,
  manager,
}: ReorderableItemProps) {
  const position = useSharedValue(0);
  const raiseStyles = useSharedValue({
    scale: 1,
    elevation: 0,
    zIndex: 1,
  });
  const wrappedManager = useWrappedManager(manager, id);
  const gesture = Gesture.Pan()
    .runOnJS(true)
    .shouldCancelWhenOutside(false)
    .cancelsTouchesInView(true)
    .activateAfterLongPress(500)
    .onBegin(() => {
      console.log('begin')
    })
    .onStart(() => {
      console.log('start')
      raiseStyles.value = {
        elevation: 7,
        scale: 1.03,
        zIndex: 10,
      };
      wrappedManager.setMoving();
    })
    .onUpdate((ev) => {
      position.value = withSpring(
        ev.translationY + wrappedManager.calculateOffset(),
        { overshootClamping: true, mass: 0.5 }
      );
      wrappedManager.checkOverlap(
        ev.translationY + wrappedManager.calculateOffset()
      );
    })
    // .onTouchesCancelled((ev) => {
    //   console.log(ev)
    // })
    .onEnd((ev) => {
      console.log('moving ended')
      raiseStyles.value = {
        elevation: 0,
        scale: 1,
        zIndex: 1,
      };
      position.value = 0;
      wrappedManager.setMovingEnded();
    });
  const moveHandle = () => {
    onMove && onMove(id);
  };
  const releaseHandle = () => {
    onMoveEnd && onMoveEnd(id);
  };

  const animatedStyles = useAnimatedProps(() => {
    return {
      transform: [
        { scale: withTiming(raiseStyles.value.scale, { duration: 150 }) },
        {
          translateY:
            position.value === 0
              ? withSpring(position.value, { mass: 0.5 })
              : position.value,
        },
      ],
      elevation: withTiming(raiseStyles.value.elevation, { duration: 150 }),
      zIndex: raiseStyles.value.zIndex,
    };
  });

  const layoutHandle = (ev: LayoutChangeEvent) =>
    wrappedManager.setLayout(ev.nativeEvent.layout);

  return (
    <Animated.View
      style={[styles.container, animatedStyles]}
      onLayout={layoutHandle}
      layout={Layout.springify().mass(0.5)}
      collapsable={false}
    >
      <GestureDetector gesture={gesture}>{children}</GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    zIndex: 1,
    elevation: 0,
    transform: [{ scale: 1 }],
  },
});
