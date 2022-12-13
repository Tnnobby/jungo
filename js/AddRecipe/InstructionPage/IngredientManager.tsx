import { useState, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  editIngredient,
  removeIngredient,
  selectIngredients,
} from "../../../redux/reducers/newRecipeReducer";
import { AddIngredient } from "./AddIngredient";
import IngredientItem from "./reorderable-ingredient";
import { createReorderableItems } from "../../components/ReorderableList/helpers";
import Reorderable from "../../components/ReorderableList";

const styles = StyleSheet.create({
  main: {
    position: "relative",
  },
});

export default function IngredientManager({ ...props }) {
  const [newIngredient, setNewIngredient] = useState(false);
  const ingredients = useSelector(selectIngredients);
  const dispatch = useDispatch();

  const addButtonPressHandle = () => dispatch(addIngredient(""));
  const updateIngredientHandle = (index, value) =>
    dispatch(editIngredient([index, value]));
  const deleteIngredient = (index) => dispatch(removeIngredient(index));
  const addIngredientHandle = (index, value) => {
    setNewIngredient(false);
    dispatch(addIngredient([index, value]));
  };
  const cancelAddHandle = () => {
    console.log("cancel add");
    setNewIngredient(false);
  };

  const setValue = (id, value) => {
    // setIngredients(
    //   ingredients.map((val, index) => {
    //     if (id === val.id) {
    //       return { id };
    //     }
    //   })
    // );
  };

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);
  return (
    <Animated.View style={styles.main}>
      <Reorderable
        data={createReorderableItems(ingredients, { idPrefix: "ingredient_" })}
        renderItems={({ item }) => (
          <IngredientItem
            value={item.item}
            inputChangeHandle={(val) => setValue(item.id, val)}
          />
        )}
      />
      {!newIngredient && <AddIngredient onPress={addButtonPressHandle} />}
    </Animated.View>
  );
}
