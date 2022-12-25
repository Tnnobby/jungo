import { ReactNode } from "react";
import { StyleSheet, Pressable, PressableProps, ViewStyle, StyleProp } from "react-native";

export interface CircleButtonProps extends PressableProps {
  icon: ReactNode;
}

export default function CircleButton ({ icon, style, ...props }: CircleButtonProps) {
  return (
    <Pressable style={[styles.main, (style as StyleProp<ViewStyle>)]} {...props}>
      {icon && icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#EAEAEA",
    borderRadius: 100,
    height: 38,
    width: 38,
    justifyContent: "center",
    alignItems: "center",
  },
});
