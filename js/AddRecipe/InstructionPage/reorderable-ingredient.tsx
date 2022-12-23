import { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInputFocusEventData,
  TextInputProps,
  View,
  Text,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SlideOutLeft } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { removeIngredient } from "../../../redux/reducers/newRecipeReducer";
import { DeleteButton } from "./DeleteButton";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import SwipeableItem from "../../components/Swipeable";

interface IngredientItemProps extends TextInputProps {
  value?: string;
  index?: number;
  inputChangeHandle?: (text: string) => void;
  inputFocusHandle?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onLongPress?: () => void;
}

export default function IngredientItem({
  value,
  index,
  inputChangeHandle,
  inputFocusHandle,
  onLongPress,
  ...props
}: IngredientItemProps) {
  const inputRef = useRef<TextInput>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useDispatch();

  const focus = () => {
    setIsEditing(true);
    // inputRef.current.focus();
  };

  useEffect(() => {
    if (!inputRef.current) return;
    if (isEditing) setTimeout(() => inputRef.current.focus(), 50);
    if (!isEditing) inputRef.current.blur();
  }, [isEditing]);

  const deleteHandle = () => {
    dispatch(removeIngredient(index));
  };

  const longPressHandle = () => {
    console.log("should drag");
    onLongPress();
  };

  return (
    <ScaleDecorator>
      <SwipeableItem
        rightElement={<DeleteButton onPress={deleteHandle} />}
        exiting={SlideOutLeft}
      >
        <Pressable
          onLongPress={longPressHandle}
          onPress={focus}
          style={styles.pressableInput}
        >
          {isEditing ? (
            <TextInput
              style={[styles.idle, styles.focus]}
              ref={inputRef}
              selectionColor="black"
              defaultValue={value || undefined}
              placeholder="New Ingredient"
              onChangeText={inputChangeHandle}
              onFocus={inputFocusHandle}
              enabled={isEditing}
              editable={isEditing}
              onBlur={() => setIsEditing(false)}
              {...props}
            />
          ) : (
            <View style={styles.idle}>
              <Text
                style={[
                  styles.text,
                  { color: value === "" ? "#C7C7CD" : "black" },
                ]}
              >
                {value || "New Ingredient"}
              </Text>
            </View>
          )}
        </Pressable>
      </SwipeableItem>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  idle: {
    width: "100%",
    height: 28,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    // backgroundColor: 'blue',
    justifyContent: "center",
    paddingTop: 2,
  },
  text: {
    color: "black",
    fontFamily: "Rubik_500",
    fontSize: 18,
    lineHeight: 20,
  },
  focus: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 0,
    color: "black",
    fontFamily: "Rubik_500",
    fontSize: 18,
    lineHeight: 20,
    // backgroundColor: 'red'
  },
  pressableInput: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 4,
    paddingHorizontal: 5
  },
});
