import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    paddingVertical: 4,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 100,
    marginTop: 8,
  },
  text: {
    fontFamily: "Rubik_500",
    fontSize: 14,
  },
});

export interface AddStepProps extends PressableProps {}
export const AddStep: React.FC<AddStepProps> = ({ style, ...props }) => (
  <Pressable style={[styles.main, style as StyleProp<ViewStyle>]} {...props}>
    <Text style={styles.text}>+ </Text>
    <Text style={styles.text}>Step</Text>
  </Pressable>
);
