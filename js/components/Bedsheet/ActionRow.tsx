import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";

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
    backgroundColor: colors.primary_color,
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
    borderColor: colors.primary_color,
    borderRadius: 100,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  cancelText: {
    fontSize: 21,
    fontFamily: "Rubik_500",
    color: colors.primary_color,
  },
});

export default function ActionRow({
  showCancel = true,
  showDone = true,
  onCancel,
  onDone,
}) {
  return (
    <View style={styles.btnContainer}>
      {showCancel && (
        <Pressable
          style={(state) => [
            styles.cancelBtn,
            {
              borderColor: state.pressed
                ? colors.active_color
                : colors.primary_color,
              color: state.pressed ? colors.active_color : colors.primary_color
            },
          ]}
          onPress={onCancel}
        >
          <Text style={[styles.cancelText, ]}>Cancel</Text>
        </Pressable>
      )}
      {showDone && (
        <Pressable
          style={(state) => {
            return [
              styles.submitBtn,
              {
                backgroundColor: state.pressed
                  ? colors.active_color
                  : colors.primary_color,
              },
            ];
          }}
          onPress={onDone}
        >
          <Text style={styles.submitText}>Done</Text>
        </Pressable>
      )}
    </View>
  );
}
