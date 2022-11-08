import { useEffect } from "react";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const SETTINGS = {
  radioSize: 30,
  toggleSize: 20,
  defaultColor: "black",
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2
  },
  toggleOuter: {
    height: SETTINGS.radioSize,
    width: SETTINGS.radioSize,
    borderRadius: 100,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  toggleInner: {
    borderRadius: 100,
  },
  label: {
    fontFamily: 'Rubik_500',
    fontSize: 22
  },
});

export default function FormRadio({
  defaultValue,
  label,
  color = SETTINGS.defaultColor,
  innerColor = SETTINGS.defaultColor,
  index,
  toggleTrigger,
  active,
  ...props
}) {
  const animateState = useRef(new Animated.Value(0)).current; // 0 if inactive, 1 if active

  useEffect(() => {
    Animated.timing(animateState, {
      toValue: active ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [active]);

  const trigger = () => toggleTrigger(index)

  return (
    <Pressable style={styles.main} onPress={trigger}>
      <View style={{ ...styles.toggleOuter, borderColor: color }}>
        <Animated.View
          style={{
            ...styles.toggleInner,
            backgroundColor: innerColor,
            width: animateState.interpolate({
              inputRange: [0, 1],
              outputRange: [0, SETTINGS.toggleSize],
            }),
            height: animateState.interpolate({
              inputRange: [0, 1],
              outputRange: [0, SETTINGS.toggleSize],
            }),
          }}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}
