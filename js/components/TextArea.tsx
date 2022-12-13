import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface TextAreaProps extends TextInputProps {
  outerStyle?: StyleProp<ViewStyle>;
}

export const TextArea = forwardRef<TextInput, TextAreaProps>(
  ({ style, outerStyle, ...props }, ref) => {
    const innerRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => innerRef.current);

    const focusInput = () => innerRef.current.focus();

    return (
      <Pressable onPress={focusInput} style={[styles.pressable, outerStyle]}>
        <TextInput ref={innerRef} style={[styles.input, style]} textAlignVertical='top' {...props} />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  pressable: {
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderColor: "#B4B4B4",
    borderWidth: 1,
    borderRadius: 8,
    height: 150,
  },
  input: {
    flex: 1,
  },
});
