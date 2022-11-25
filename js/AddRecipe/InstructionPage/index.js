import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import useFirebase from "../../api/useFirebase";
import GeneralStyles from "../../components/GeneralStyles";
import constants from "../../constants";
import IngredientManager from "./IngredientManager";
import InstructionManager from "./InstructionManager";

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginTop: 10,
    // backgroundColor: 'red',
    flexGrow: 1,
  },
  ingredientContainer: {
    marginBottom: 10,
  },
  saveCont: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%",
    bottom: 20,
  },
  saveBtn: {
    backgroundColor: constants.primary_color,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 100,
  },
  saveTxt: {
    fontFamily: "Rubik_500",
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 30,
    fontSize: 20,
    elevation: 5,
  },
});

export default function InstructionPage({ saveRecipe, ...props }) {
  const { ingredients, instructions } = useSelector(
    (state) => state.edit_recipe
  );

  const saveHandle = () => {
    saveRecipe();
  };

  useEffect(() => {
    console.log("Instruction Page");
  }, []);

  return (
    <Animated.View style={styles.main}>
      <Text style={{ ...GeneralStyles.header, color: constants.primary_color }}>
        Ingredients
      </Text>
      <View style={styles.ingredientContainer}>
        <IngredientManager initialValue={ingredients}/>
      </View>
      <Text style={{ ...GeneralStyles.header, color: constants.primary_color }}>
        Instructions
      </Text>
      <View>
        <InstructionManager />
      </View>
      <View style={styles.saveCont}>
        <Pressable style={styles.saveBtn} onPress={saveHandle}>
          <Text style={styles.saveTxt}>Save</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
