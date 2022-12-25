import { useState } from "react";
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    borderWidth: 2,
    paddingTop: 6,
    paddingBottom: 6,
    // width: 100,
    // paddingHorizontal: 25,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
});

export interface ButtonProps extends PressableProps {
  style: StyleProp<ViewStyle>
}

// TODO : This button is in a weird spot between too specific and too broad (Used only in Profile header)
export default function Button({ style, ...props }: ButtonProps) {
  return (
    <Pressable
      style={[styles.container, style]}
      {...props}
    >
      {props.children}
    </Pressable>
  );
}
