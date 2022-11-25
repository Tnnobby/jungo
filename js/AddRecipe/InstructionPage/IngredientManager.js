import { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  editIngredient,
  removeIngredient,
} from "../../../redux/reducers/newRecipeReducer";
import AddIngredient from "./AddIngredient";
import IngredientItem from "./reorderable-ingredient";
import { createReorderableItems } from "../../components/ReorderableList/helpers";
import Reorderable from "../../components/ReorderableList";

const styles = StyleSheet.create({
  main: {
    position: "relative",
  },
});

export default function IngredientManager({ initialValue, ...props }) {
  const [newIngredient, setNewIngredient] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [ingredients, setIngredients] = useState(
    createReorderableItems(initialValue, { idPrefix: "ingredient_" })
  );
  const dispatch = useDispatch();

  const addButtonPressHandle = () => setNewIngredient(true);
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
    setIngredients(
      ingredients.map((val, index) => {
        if (id === val.id) {
          return { id };
        }
      })
    );
  };

  console.log(ingredients);

  return (
    <Animated.View style={styles.main}>
      <Reorderable
        data={ingredients}
        renderItems={({ item }) => (
          <IngredientItem
            value={item.item}
            inputChangeHandle={(val) => setValue(item.id, val)}
          />
        )}
        
      />
      {/* {ingredients.map((item, index) => {
        return (
          <IngredientItem
            key={`ingredient_${item}`}
            ingredient={item}
            index={index}
            deleteIngredient={deleteIngredient}
            updateIngredient={updateIngredientHandle}
            reordering={reordering}
            setReordering={setReordering}
          />
        );
      })}
      {newIngredient && (
        <IngredientItem
          key={`ingredient_${ingredients.length}`}
          newIngredient={true}
          index={ingredients.length}
          deleteIngredient={deleteIngredient}
          addIngredient={addIngredientHandle}
          cancelAdd={cancelAddHandle}
        />
      )} */}
      {!newIngredient && <AddIngredient onPress={addButtonPressHandle} />}
    </Animated.View>
  );
}
