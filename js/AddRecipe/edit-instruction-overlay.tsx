import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  addInstruction,
  editInstruction,
} from "../../redux/reducers/newRecipeReducer";
import { AddRecipePageProps } from "../../routes/routes";
import GeneralStyles from "../components/GeneralStyles";
import NavigationPage from "../components/NavigationPage";
import { colors } from "../constants";
import AddRecipeHeader from "./add-recipe-header";

type InstructionEditModalProps = AddRecipePageProps<"instruction-modal">;

export const InstructionEditModal: React.FC<InstructionEditModalProps> = ({
  navigation,
  route,
}) => {
  const { id, value, newInstruction } = route.params.initialValue;
  const [description, setDescription] = useState(value);
  const dispatch = useDispatch();
  const editRef = useRef<TextInput>();

  const inputPress = () => editRef.current.focus();
  const doneHandle = () => {
    console.log(description);
    if (description !== null) {
      if (newInstruction) dispatch(addInstruction(description));
      else
        dispatch(
          editInstruction({
            index: parseInt(id.split("_")[1]),
            value: description,
          })
        );
    }
    navigation.goBack();
  };

  return (
    <NavigationPage>
      <AddRecipeHeader
        lastPage="pagetwo"
        backButtonShown={false}
        onClosePress={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <Text style={{ ...GeneralStyles.header, color: colors.primary_color }}>
          Edit Step {parseInt(id.split("_")[1]) + 1}
        </Text>
        <Pressable style={styles.editBox} onPress={inputPress}>
          <TextInput
            placeholder={"Enter Description"}
            multiline={true}
            style={styles.input}
            ref={editRef}
            defaultValue={newInstruction ? null : description}
            onChangeText={setDescription}
          />
        </Pressable>
        <View style={styles.doneCont}>
          <Pressable style={styles.doneBtn} onPress={doneHandle}>
            <Text style={styles.doneTxt}>Done</Text>
          </Pressable>
        </View>
      </View>
    </NavigationPage>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
  },
  editBox: {
    padding: 5,
    backgroundColor: "#F5F5F5",
    borderColor: "#B4B4B4",
    borderWidth: 1,
    borderRadius: 8,
    height: 150,
  },
  input: {
    fontSize: 14,
    marginHorizontal: 2,
  },
  doneCont: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  doneBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary_color,
    borderRadius: 100,
  },
  doneTxt: {
    fontSize: 22,
    fontFamily: "Rubik_500",
    color: "white",
    paddingVertical: 3,
    paddingHorizontal: 20,
  },
});
