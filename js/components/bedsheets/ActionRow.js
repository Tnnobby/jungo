import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import constants from "../../constants";

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 50,
    justifyContent: "center",
  },
  submitBtn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: constants.primary_color,
    borderRadius: 100,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 21,
    fontFamily: "Rubik_500",
    color: "white",
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: constants.primary_color,
    borderRadius: 100,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  cancelText: {
    fontSize: 21,
    fontFamily: "Rubik_500",
    color: constants.primary_color,
  },
});

export default function ActionRow({
  showCancel = true,
  showDone = true,
  cancelHandle,
  doneHandle,
  ...props
}) {
  const [cancelState, setCancelState] = useState(false);
  const [doneState, setDoneState] = useState(false);

  const doneOnPressOut = () => setDoneState(false);
  const doneOnPressIn = () => setDoneState(true);
  const doneOnPress = () => doneHandle();

  const cancelOnPressOut = () => setCancelState(false);
  const cancelOnPressIn = () => setCancelState(true);
  const cancelOnPress = () => cancelHandle();

  return (
    <View style={styles.btnContainer}>
      {showCancel && <Pressable
        style={{
          ...styles.cancelBtn,
          borderColor: cancelState
            ? constants.active_color
            : constants.primary_color,
        }}
        onPress={cancelOnPress}
        onPressIn={cancelOnPressIn}
        onPressOut={cancelOnPressOut}
      >
        <Text
          style={{
            ...styles.cancelText,
            color: cancelState
              ? constants.active_color
              : constants.primary_color,
          }}
        >
          Cancel
        </Text>
      </Pressable>}
      {showDone && <Pressable
        style={{
          ...styles.submitBtn,
          backgroundColor: doneState
            ? constants.active_color
            : constants.primary_color,
        }}
        onPress={doneOnPress}
        onPressIn={doneOnPressIn}
        onPressOut={doneOnPressOut}
      >
        <Text style={styles.submitText}>Done</Text>
      </Pressable>}
    </View>
  );
}
