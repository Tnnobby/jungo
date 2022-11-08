import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import constants from "../../constants";

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    paddingVertical: 4,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 100,
    marginTop: 8
  },
  text: {
    fontFamily: 'Rubik_500',
    fontSize: 14,
  }
})

export default function AddStep ({onPress, props}) {
  const [pressing, setPressing] = useState(false);

  const handles = {
    onPressIn: () => setPressing(true),
    onPressOut: () => setPressing(false),
    onPress: () => onPress()
  }

  return (
    <Pressable style={styles.main}  {...handles}>
      <Text style={styles.text}>+ </Text>
      <Text style={styles.text}>Step</Text>
    </Pressable>
  )
}
