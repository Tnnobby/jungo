import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useRef } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  main: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#EAEAEA",
    paddingVertical: 9,
    paddingHorizontal: 20,
  },
  inputStyle: {
    fontSize: 22,
    fontFamily: "Rubik_500",
  },
  invalid: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 8,
  },
});

export interface FormInputProps extends TextInputProps {
  invalid?: boolean;
  invalidStyle?: StyleProp<ViewStyle>;
  outerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

export const FormInput = forwardRef<TextInput, FormInputProps>(
  ({ invalid, invalidStyle, outerStyle, fullWidth, ...props }, ref) => {
    const innerRef = useRef<TextInput>();

    useImperativeHandle(innerRef, () => innerRef.current);

    const pressHandle = () => innerRef.current.focus();

    return (
      <Pressable
        style={
          invalid
            ? [
                styles.main,
                { width: fullWidth ? "100%" : undefined },
                outerStyle,
                invalidStyle,
              ]
            : [
                styles.main,
                { width: fullWidth ? "100%" : undefined },
                outerStyle,
              ]
        }
        onPress={pressHandle}
        ref={ref}
      >
        <TextInput ref={ref} {...props} />
      </Pressable>
    );
  }
);
