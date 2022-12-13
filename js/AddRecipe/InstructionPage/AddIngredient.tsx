import { useState } from "react";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 108,
    paddingVertical: 4,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 100,
    marginTop: 5
  },
  text: {
    fontFamily: 'Rubik_500',
    fontSize: 14,
  }
})

interface AddIngredientProps extends PressableProps {

}

export const AddIngredient = ({ ...props }) => (
    <Pressable style={styles.main}  {...props}>
      <Text style={styles.text}>+ </Text>
      <Text style={styles.text}>Ingredient</Text>
    </Pressable>
  )

