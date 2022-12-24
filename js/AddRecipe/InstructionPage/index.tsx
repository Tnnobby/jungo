import { NavigationProp } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NestableScrollContainer } from "react-native-draggable-flatlist/lib/components/NestableScrollContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipeFields,
} from "../../../redux/reducers/newRecipeReducer";
import { RootStack } from "../../../routes/RootRouter";
import { AddRecipePageProps } from "../../../routes/routes";
import useFirebaseRecipes from "../../api/useFirebaseRecipes";
import NavigationPage from "../../components/NavigationPage";
import { SectionTitle } from "../../components/SectionTitle";
import { colors, shadows } from "../../constants";
import AddRecipeHeader from "../add-recipe-header";
import { IngredientFlatList } from "./IngredientFlatList";
import { InstructionFlatList } from "./InstructionFlatList";

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

export type InstructionPageProps = AddRecipePageProps<"pagetwo">;

export default function InstructionPage({
  navigation,
  route,
}: InstructionPageProps) {
  const recipe = useSelector(selectRecipeFields);
  const { addRecipe } = useFirebaseRecipes();
  const dispatch = useDispatch();

  // TODO : Test this and see if the redirection works as expected.
  const saveHandle = () => {
    addRecipe(recipe).then((res) => {
      const parentNavigator = navigation.getParent<NavigationProp<RootStack>>();
      if (parentNavigator)
        parentNavigator.reset({
          routes: [
            { name: "home" },
            { name: "view-recipe", params: { data: res } },
          ],
        });
    });
  };

  return (
    <NavigationPage>
      <AddRecipeHeader lastPage="pageone" />
      <NestableScrollContainer automaticallyAdjustKeyboardInsets>
        <Pressable style={{ flex: 1 }}>
          <SectionTitle style={{ paddingHorizontal: 20 }}>
            Ingredients
          </SectionTitle>
          <IngredientFlatList ingredients={recipe.ingredients} />

          <SectionTitle style={{ paddingHorizontal: 20 }}>
            Instructions
          </SectionTitle>
          <InstructionFlatList instructions={recipe.instructions} />

          <View style={{ height: 30 }} />
        </Pressable>
      </NestableScrollContainer>
      <Pressable style={styles.saveButton} onPress={saveHandle}>
        <Text style={styles.saveTxt}>Save</Text>
      </Pressable>
    </NavigationPage>
  );
}
