import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Keyboard, ViewProps } from "react-native";
import Animated, {
  AnimateProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useAnimatedStyle } from "react-native-reanimated";

interface KeyboardSafeViewProps extends AnimateProps<ViewProps> {
  offset?: boolean;
}

export type KeyboardSafeViewRef = {
  raise: () => void;
}

export const KeyboardSafeView = forwardRef<KeyboardSafeViewRef, KeyboardSafeViewProps>(
  ({ children, style }: KeyboardSafeViewProps, ref) => {
    const yOffset = useSharedValue<number>(0);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: yOffset.value }],
      };
    });

    const raise = () => {
      const show = Keyboard.addListener("keyboardDidShow", (ev) => {
        yOffset.value = withSpring(-ev.endCoordinates.height, {
          mass: 0.5,
        });
      });
      const hide = Keyboard.addListener("keyboardDidHide", () => {
        yOffset.value = withSpring(0, { mass: 0.5 });
        show.remove();
        hide.remove();
      });
    };

    useImperativeHandle(ref, () => ({ raise }));

    return (
      <Animated.View style={[{ flex: 1 }, style, animatedStyle]}>
        {children}
      </Animated.View>
    );
  }
);

// export const KeyboardSafeView = ({
//   offset,
//   style,
//   children,
// }: KeyboardSafeViewProps) => {
//   const yOffset = useSharedValue<number>(0);

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: yOffset.value }],
//     };
//   });

//   useEffect(() => {
//     if (offset) {
//       const show = Keyboard.addListener("keyboardDidShow", (ev) => {
//         console.log('open')
//         yOffset.value = withSpring(-ev.endCoordinates.height, {
//           mass: 0.5
//         });
//       });
//       return () => show.remove()
//     } else {
//       const hide = Keyboard.addListener("keyboardDidHide", () => {
//         console.log('closed')
//         yOffset.value = withSpring(0, { mass: 0.5 });
//       });
//       return () => hide.remove()
//     }
//   }, [offset]);

//   return (
//     <Animated.View style={[{ flex: 1 }, style, animatedStyle]}>
//       {children}
//     </Animated.View>
//   );
// };
