import React, { useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
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

interface AddStepProps extends PressableProps {}
export const AddStep: React.FC<AddStepProps> = (props) => (
  <Pressable style={styles.main} {...props}>
    <Text style={styles.text}>+ </Text>
    <Text style={styles.text}>Step</Text>
  </Pressable>
);
