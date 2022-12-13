import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { selectInstructions } from "../../../redux/reducers/newRecipeReducer";
import { AddRecipeStack } from "../../../routes/AddRecipeRouter";
import { AddStep } from "./AddStep";
import InstructionItem from "./InstructionItem";

const NULL_PLACEHOLDER = "NEW_DESCRIPTION";

export default function InstructionManager({ ...props }) {
  const instructions = useSelector(selectInstructions);
  const navigation = useNavigation<NavigationProp<AddRecipeStack>>();
  const addHandle = () => {};

  const openEdit = (value: string, index: number) => {
    navigation.navigate("instruction-modal", {
      initialValue: { id: `instruction_${index}`, value },
    });
  };

  return (
    <View>
      {instructions.map((data, index) => {
        return (
          <InstructionItem
            key={`instruction_${index}`}
            description={data}
            step={index + 1}
            onPress={() => openEdit(data, index)}
          />
        );
      })}
      <AddStep onPress={addHandle} />
    </View>
  );
}
