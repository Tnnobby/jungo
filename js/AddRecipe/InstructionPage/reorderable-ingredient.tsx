import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  Text,
  Pressable,
  View,
} from "react-native";
import { Gesture, GestureDetector, TextInput } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import SwipeableItem from "../../components/Swipeable";
import DeleteIcon from "../../svg/jsx/DeleteIcon";

interface IngredientItemProps {
  value?: string;
  inputChangeHandle?: (text: string) => void;
  inputFocusHandle?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export default function IngredientItem({
  value,
  inputChangeHandle,
  inputFocusHandle,
}: IngredientItemProps) {
  const inputRef = useRef<TextInput>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const focus = () => {
    console.log('editing');
    setIsEditing(true)
    inputRef.current.focus()
  }

  const tapGesture = Gesture.Tap()
    .maxDelay(100)
    .onStart((ev) => {
      runOnJS(focus)()
    })

  return (
    <SwipeableItem rightElement={<DeleteButton />}>
      <GestureDetector gesture={tapGesture}>
        <View style={styles.pressableInput}>
          <TextInput
            style={
              isEditing ? { ...styles.input, ...styles.focus } : styles.input
            }
            ref={inputRef}
            selectionColor="black"
            defaultValue={value}
            onChangeText={inputChangeHandle}
            onFocus={inputFocusHandle}
            editable={isEditing}
            onBlur={() => setIsEditing(false)}
          />
        </View>
      </GestureDetector>
    </SwipeableItem>
  );
}

export const DeleteButton = ({ onPress = () => {}, ...props }) => (
  <LinearGradient
    colors={["#EDEDED", "#FFFFFF"]}
    start={{ x: 1, y: 0.5 }}
    end={{ x: 0.7, y: 0.5 }}
    style={styles.backdrop}
  >
    <Pressable
      style={{
        ...styles.deletePressable,
      }}
      onPress={onPress}
      {...props}
    >
      <DeleteIcon />
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  </LinearGradient>
);

const styles = StyleSheet.create({
  input: {
    color: "black",
    fontFamily: "Rubik_500",
    fontSize: 18,
    lineHeight: 20,
    width: "100%",
    height: 28,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  focus: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginVertical: 3,
  },
  pressableInput: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 4,
  },
  // Delete Styles
  backdrop: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    zIndex: 4,
    borderRadius: 5,
  },
  deletePressable: {
    paddingVertical: 2,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
  },
  deleteText: {
    color: "#EF3232",
    fontFamily: "Rubik_400",
    zIndex: 1,
    marginLeft: 3,
  },
});
