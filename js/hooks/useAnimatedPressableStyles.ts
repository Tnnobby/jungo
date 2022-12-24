import { StyleProp, ViewStyle, PressableStateCallbackType } from "react-native";
import {
  ComplexAnimationBuilder,
  useSharedValue,
} from "react-native-reanimated";

type PressableStyle =
  | StyleProp<ViewStyle>
  | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);

// Type of Returned styles (null if not animatable)
type AnimatedStyle = {
  default: StyleProp<ViewStyle>;
  pressed: StyleProp<ViewStyle>;
};

// Hook Type
type useAnimatedPressableStylesHook = (style: PressableStyle) => {
  canBeAnimated: boolean;
  animatedStyleProperties: AnimatedStyle;
};

const recursiveDiff = (objectA: object, objectB: object) => {
  if (objectA === objectB) return {}
}

// const extractAnimatable = ({
//   defaultStyles,
//   pressedStyles,
// }: {
//   defaultStyles: StyleProp<ViewStyle>;
//   pressedStyles: StyleProp<ViewStyle>;
// }) => {
//   let commonStyles = [];
//   if (pressedStyles["transform"]) {
//     pressedStyles["transform"].forEach((value, index) => {
//       const _valueKey = Object.keys(value)[0];
//       console.log(_valueKey);
//       if (
//         defaultStyles["transform"].find(
//           (style) => Object.keys(style)[0] === _valueKey
//         )
//       )
//         commonStyles.push(`transform_${_valueKey}`);
//     });
//   }
//   for (const style in pressedStyles as any) {
//     if (defaultStyles[style] !== pressedStyles[style] && style !== "transform")
//       commonStyles.push(style);
//   }
//   return commonStyles.map<{}>((_style) => {
//     if (_style.includes("transform_")) {
//       _style = _style.split('_')[1]
//       console.log([{scale: 1}, {translateY: 10}].indexOf(val => console.log(val)))
//       return {
//         key: _style,
//         default: defaultStyles['transform'][defaultStyles['transform'].indexOf((val) => Object.keys(val)[0] === _style)],
//         pressed: pressedStyles['transform'][pressedStyles['transform'].indexOf((val) => Object.keys(val)[0] === _style)]
//       }
//     }
//       return { key: _style, default: defaultStyles[_style], pressed: pressedStyles[_style] };
//   });
// };

export const useAnimatedPressableStyles: useAnimatedPressableStylesHook = (
  style
) => {
  // if the style is not a function then it is just a style sheet, no need to animate
  if (typeof style !== "function")
    return {
      canBeAnimated: false,
      animatedStyleProperties: null,
    };
  const value = useSharedValue(0);

  const defaultStyles = style({ pressed: false });
  const pressedStyles = style({ pressed: true });
  // const commonStyles = extractAnimatable({ defaultStyles, pressedStyles });
  // console.log(
  //   "🚀 ~ file: useAnimatedPressableStyles.ts:63 ~ commonStyles",
  //   commonStyles
  // );

  return {
    canBeAnimated: false,

    animatedStyleProperties: {
      default: {},
      pressed: {},
    },
  };
};
