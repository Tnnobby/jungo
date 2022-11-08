import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AddCircleFilled from "../svg/jsx/AddCircleFilled";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 100,
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  icon: {
    position: 'relative',
    height: 60,
    width: 60,
  },
  dropShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    elevation: 4,
    backgroundColor: 'transparent'
  },
  svg: {
    elevation: 4,
    borderRadius: 100
  }
})

export default function FloatingAddButton ({onPress, ...props}) {
  const [pressing, setPressing] = useState(false);

  const pressInHandle = () => setPressing(true)
  const pressOutHandle = () => setPressing(false)
  const pressHandle = () => onPress && onPress()

  return (
    <View
      style={styles.container}
    >
      <Pressable
        style={styles.icon}
        onPressIn={pressInHandle}
        onPressOut={pressOutHandle}
        onPress={pressHandle}
      >
        <AddCircleFilled style={styles.svg} />
        {/* <View style={styles.dropShadow}/> */}
      </Pressable>
    </View>
  )
}