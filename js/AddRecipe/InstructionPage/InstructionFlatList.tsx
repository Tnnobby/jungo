import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import DraggableFlatList, { RenderItem } from "react-native-draggable-flatlist";
import { SlideOutLeft } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { removeInstruction } from "../../../redux/reducers/newRecipeReducer";
import { AddRecipeStack } from "../../../routes/AddRecipeRouter";
import SwipeableItem from "../../components/Swipeable";
import { AddStep } from "./AddStep";
import { DeleteButton } from "./DeleteButton";
import InstructionItem from "./InstructionItem";

export type InstructionFlatListProps = {
  instructions: string[];
};

export const InstructionFlatList = ({
  instructions,
}: InstructionFlatListProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<AddRecipeStack>>();

  const deleteHandle = (i: number) => {
    dispatch(removeInstruction(i));
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
  const addHandle = () => {
    navigation.navigate("instruction-modal", {
      initialValue: {
        id: `instruction_${instructions.length}`,
        value: null,
        newInstruction: true,
      },
    });
  };

  const renderItems: RenderItem<string> = useCallback(
    ({ drag, isActive, item, index }) => {
      return (
        <SwipeableItem
          rightElement={<DeleteButton onPress={() => deleteHandle(index)} />}
          exiting={SlideOutLeft}
        >
          <InstructionItem
            description={item}
            step={index + 1}
            onPress={() => openEdit(item, index)}
          />
        </SwipeableItem>
      );
    },
    []
  );
  const extractKeys: (item: string, index: number) => string = useCallback((item, index) => {
    return `instruction_${index}`
  }, [])

  return (
    <>
      <DraggableFlatList
        data={instructions}
        renderItem={renderItems}
        contentContainerStyle={{ marginHorizontal: 15 }}
        keyExtractor={extractKeys}
        automaticallyAdjustKeyboardInsets={true}
      />
      <AddStep style={{ marginHorizontal: 20 }} onPress={addHandle}/>
    </>
  );
};
