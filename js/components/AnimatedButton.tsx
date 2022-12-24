import { Pressable, PressableProps } from "react-native";
import { useAnimatedPressableStyles } from "../hooks/useAnimatedPressableStyles";

interface AnimatedButtonProps extends PressableProps {}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  style,
  ...props
}) => {
  // TODO : finish this hook
  // const { canBeAnimated, animatedStyleProperties } = useAnimatedPressableStyles(style);

  return <Pressable style={style} {...props}>{children}</Pressable>;
};
