import { LayoutRectangle, StyleSheet, LayoutChangeEvent } from "react-native";
import Animated, {
  Layout,
  runOnJS,
  SlideInLeft,
  SlideInRight,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import useWrappedManager from "./useWrappedManager";
import { useEffect } from "react";
import { ReorderableManager } from "./reorderable";

export type ReorderableItemProps = {
  children?: React.ReactNode;
  onMove?: (id: string) => void;
  onMoveEnd?: (id: string) => void;
  id: string;
  manager?: ReorderableManager;
  reordering: boolean
};

export default function ReorderableItem({
  children,
  onMove,
  onMoveEnd,
  id,
  manager,
  reordering
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
    .activateAfterLongPress(500)
    .onBegin(() => {
      console.log('reorder begin')
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
    .onEnd((ev) => {
      console.log('moving ended')
      raiseStyles.value = {
        elevation: 0,
        scale: 1,
        zIndex: 1,
      };
      position.value = withSpring(0, { mass: 0.5 }, () => runOnJS(manager.setAnimationEnded)())
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
          translateY: position.value
        },
      ],
      elevation: withTiming(raiseStyles.value.elevation, { duration: 150 }),
      zIndex: raiseStyles.value.zIndex,
    };
  }, [manager.setAnimationEnded]);

  const layoutHandle = (ev: LayoutChangeEvent) =>
    wrappedManager.setLayout(ev.nativeEvent.layout);

  useEffect(() => {
    console.log(reordering);
    
  }, [reordering])

  return (
    <Animated.View
      style={[styles.container, animatedStyles]}
      onLayout={layoutHandle}
      layout={reordering ? Layout.springify().mass(0.5) : undefined}
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
