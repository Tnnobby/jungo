import { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, editIngredient, removeIngredient } from "../../../redux/reducers/newRecipeReducer";
import AddIngredient from "./AddIngredient";
import IngredientItem from "./IngredientItem";

const styles = StyleSheet.create({
  main: {
    position: 'relative'
  },
});

export default function IngredientManager({ ...props }) {
  const [newIngredient, setNewIngredient] = useState(false);
  const [reordering, setReordering] = useState(false);
  const ingredients = useSelector((state) => state.edit_recipe.ingredients);
  const dispatch = useDispatch();
  const yOffset = useRef(new Animated.Value(0)).current;

  const addButtonPressHandle = () => setNewIngredient(true);
  const updateIngredientHandle = (index, value) => dispatch(editIngredient([index, value]));
  const deleteIngredient = (index) => dispatch(removeIngredient(index));
  const addIngredientHandle = (index, value) => {
    setNewIngredient(false);
    dispatch(addIngredient([index, value]))
  }
  const cancelAddHandle = () => {
    console.log('cancel add')
    setNewIngredient(false)
  }

  return (
    <Animated.View style={{...styles.main, transform: [{translateY:yOffset}]}}>
      {/* <FlatList 
        style={{width: '100%'}}
        data={ingredients}
        renderItem={({item, index}) => {
          return <IngredientItem
            key={`ingredient_${item}`}
            ingredient={item}
            index={index}
            deleteIngredient={deleteIngredient}
            updateIngredient={updateIngredientHandle}
          />
        }}
      /> */}
      {ingredients.map((item, index) => {
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
      )}
      {!newIngredient && <AddIngredient onPress={addButtonPressHandle} />}
    </Animated.View>
  );
}
