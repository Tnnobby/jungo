import RNDateTimePicker from "@react-native-community/datetimepicker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  Keyboard,
} from "react-native";
import { useLoginContext } from "../../context-providers/LoginContextType";
import { LoginStack } from "../../../routes/LoginRouter";
import { useOverlay } from "../../hooks/useOverlay";
import { DatePicker } from "../bedsheets/DatePicker";

const styles = StyleSheet.create({
  main: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#EAEAEA",
    paddingVertical: 9,
    paddingHorizontal: 20,
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: "Rubik_400",
    marginVertical: 2,
    color: "gray",
  },
  dateStyle: {
    fontSize: 18,
    fontFamily: "Rubik_400",
    marginVertical: 2,
    color: "black",
  },
});

const MONTHS = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

interface FormDateInputProps {
  onChange?: (value: Date) => void;
  value?: Date;
  placeholder?: Date;
}

// TODO : fix this up, find out if date is necessary and probably lift state up if possible
export default function FormDateInput({
  onChange,
  value,
  placeholder,
}: FormDateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<LoginStack>>();

  const pressHandle = () => {
    Keyboard.dismiss();
    Platform.OS === "ios"
      ? navigation.navigate("date-bedsheet", {
          initialValue: value || placeholder,
        })
      : setIsOpen(true);
  };

  const androidChangeHandle = (_, val) => {
    setIsOpen(false);
    onChange && onChange(val);
  };

  const formatDate = (date) => {
    return `${
      MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <Pressable style={styles.main} onPress={pressHandle}>
        <Text style={!value ? styles.placeholderStyle : styles.dateStyle}>
          {!value ? formatDate(placeholder) : formatDate(value)}
        </Text>
      </Pressable>
      {Platform.OS !== "ios" && isOpen && (
        <RNDateTimePicker
          accentColor="#00B700"
          value={value || placeholder}
          onChange={androidChangeHandle}
        />
      )}
    </>
  );
}
