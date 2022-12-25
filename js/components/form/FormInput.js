import { useEffect } from "react";
import { useRef } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";

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
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 8
  }
});

/**
 * @param {*} param0
 * @returns
 */
export default function FormInput({
  invalid,
  invalidStyle = styles.invalid,
  outerStyle,
  getInputRef,
  fullWidth = true,
  ...props
}) {
  const inputRef = useRef();

  useEffect(() => {
    getInputRef && getInputRef(inputRef);
  }, []);

  const pressHandle = () => inputRef.current.focus();

  return (
    <Pressable
      style={invalid ? {
        ...styles.main,
        width: fullWidth ? "100%" : undefined,
        ...outerStyle,
        ...invalidStyle
      } : {
        ...styles.main,
        width: fullWidth ? "100%" : undefined,
        ...outerStyle,
      }}
      onPress={pressHandle}
    >
      <TextInput ref={inputRef} {...props}/>
    </Pressable>
  );
}
