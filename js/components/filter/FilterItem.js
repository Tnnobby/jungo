import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  itemMain: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    elevation: 3,
    marginRight: 10,
    marginBottom: 10
  },
  textTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: "Rubik_500",
  },
});

export default function FilterItem({ bgColor, fontColor, text, icon }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressInHandle = () => {
    Animated.spring(scale,
      {
        toValue: 0.95,
        // duration: 200,
        useNativeDriver: true
      }
    ).start();
  }
  const pressOutHandle = () => {
    Animated.spring(scale,
      {
        toValue: 1,
        // duration: 200,
        useNativeDriver: true
      }
    ).start();
  }

  return (
    <Pressable
    onPressIn={pressInHandle}
    onPressOut={pressOutHandle}
    >
      <Animated.View style={{
        ...styles.itemMain,
        backgroundColor: bgColor,
        transform: [{scale}]
      }}>
        <Text
          style={{
            ...styles.textTitle,
            color: fontColor,
          }}
        >
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
