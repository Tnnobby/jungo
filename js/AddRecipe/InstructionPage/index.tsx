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
import { selectIngredients } from "../../../redux/reducers/newRecipeReducer";
import { AddRecipePageProps } from "../../../routes/routes";
import GeneralStyles from "../../components/GeneralStyles";
import NavigationPage from "../../components/NavigationPage";
import { SectionTitle } from "../../components/SectionTitle";
import { colors, shadows } from "../../constants";
import AddRecipeHeader from "../add-recipe-header";
import IngredientManager from "./IngredientManager";
import InstructionManager from "./InstructionManager";

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
    backgroundColor: colors.primary_color,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 100,
  },
  saveTxt: {
    fontFamily: "Rubik_500",
    color: "white",
    fontSize: 20,
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 125,
    backgroundColor: colors.primary_color,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 100,
    ...shadows.elevation2,
  },
});

type InstructionPageProps = AddRecipePageProps<"pagetwo">;

export default function InstructionPage({
  navigation,
  route,
}: InstructionPageProps) {
  const saveHandle = () => {
    // saveRecipe();
  };

  return (
    <NavigationPage>
      <AddRecipeHeader lastPage="pageone" />
      <View style={styles.body}>
        <SectionTitle>Ingredients</SectionTitle>
        <View style={styles.ingredientContainer}>
          <IngredientManager />
        </View>
        <SectionTitle>Instructions</SectionTitle>
        <View>
          <InstructionManager />
        </View>
        <Pressable style={styles.saveButton} onPress={saveHandle}>
          <Text style={styles.saveTxt}>Save</Text>
        </Pressable>
      </View>
    </NavigationPage>
  );
}
