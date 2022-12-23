import { useCallback, useState } from "react";
import {
  DragEndParams,
  NestableDraggableFlatList,
  RenderItem,
} from "react-native-draggable-flatlist";
import { useDispatch } from "react-redux";
import {
  addIngredient,
  editIngredient,
  reorderIngredients,
} from "../../../redux/reducers/newRecipeReducer";
import { AddIngredient } from "./AddIngredient";
import IngredientItem from "./reorderable-ingredient";

export type IngredientFlatListProps = {
  ingredients: string[];
};

export const IngredientFlatList = ({
  ingredients,
}: IngredientFlatListProps) => {
  const [newIngredient, setNewIngredient] = useState<boolean>(false);
  const dispatch = useDispatch();

  const renderIngredients: RenderItem<string> = useCallback(
    ({ drag, item, index }) => (
      <IngredientItem
        index={index}
        value={item}
        onLongPress={drag}
        inputChangeHandle={(val) =>
          dispatch(editIngredient({ index, value: val }))
        }
      />
    ),
    []
  );
  const extractIngredientsKeys = useCallback(
    (item: string, index: number) => `ingredient_${index}`,
    []
  );
  const updateIngredients = useCallback(
    ({ data }: DragEndParams<string>) => dispatch(reorderIngredients(data)),
    []
  );

  const addButtonPressHandle = () => {
    dispatch(addIngredient(""));
  };

  return (
    <>
      <NestableDraggableFlatList
        contentContainerStyle={{ paddingHorizontal: 15 }}
        data={ingredients}
        renderItem={renderIngredients}
        keyExtractor={extractIngredientsKeys}
        onDragEnd={updateIngredients}
        automaticallyAdjustKeyboardInsets={true}
      />
      <AddIngredient
        onPress={addButtonPressHandle}
        style={{ marginHorizontal: 20 }}
      />
    </>
  );
};
