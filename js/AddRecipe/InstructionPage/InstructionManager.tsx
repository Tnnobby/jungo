import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View } from "react-native";
import { SlideOutLeft, SlideOutRight } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { removeInstruction, selectInstructions } from "../../../redux/reducers/newRecipeReducer";
import { AddRecipeStack } from "../../../routes/AddRecipeRouter";
import Reorderable from "../../components/ReorderableList";
import { createReorderableItems } from "../../components/ReorderableList/helpers";
import SwipeableItem from "../../components/Swipeable";
import { AddStep } from "./AddStep";
import { DeleteButton } from "./DeleteButton";
import InstructionItem from "./InstructionItem";

export default function InstructionManager({ ...props }) {
  const instructions = useSelector(selectInstructions);
  const navigation = useNavigation<NavigationProp<AddRecipeStack>>();
  const dispatch = useDispatch();
  const addHandle = () => {
    navigation.navigate("instruction-modal", {
      initialValue: {
        id: `instruction_${instructions.length}`,
        value: null,
        newInstruction: true,
      },
    });
  };

  const openEdit = (value: string, index: number) => {
    navigation.navigate("instruction-modal", {
      initialValue: {
        id: `instruction_${index}`,
        value,
        newInstruction: false,
      },
    });
  };

  const deleteHandle = (index: number) => {
    dispatch(removeInstruction(index))
  }

  useEffect(() => {
    console.log(instructions)
  }, [instructions])

  return (
    <View>
      <Reorderable
        data={createReorderableItems(instructions, {
          idPrefix: "instruction_",
        })}
        renderItems={(data, index) => {
          return (
            <SwipeableItem rightElement={<DeleteButton onPress={() => deleteHandle(index)}/>} exiting={SlideOutLeft}>
              <InstructionItem
                description={data.item}
                step={index + 1}
                onPress={() => openEdit(data.item, index)}
              />
            </SwipeableItem>
          );
        }}
      />
      <AddStep onPress={addHandle} />
    </View>
  );
}
