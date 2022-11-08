import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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

export default function Button({ onPress, onPressIn, onPressOut, style, ...props }) {
  return (
    <Pressable
      style={{
        ...styles.container,
        ...style,
      }}
      onPress={onPress && onPress}
      onPressIn={onPressIn && onPressIn}
      onPressOut={onPressOut && onPressOut}
      {...props}
    >
      {props.children}
    </Pressable>
  );
}
