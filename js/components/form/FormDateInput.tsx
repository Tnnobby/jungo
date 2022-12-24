import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  Keyboard,
} from "react-native";

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

  const pressHandle = () => {
    Keyboard.dismiss();
    setIsOpen(true);
  };

  const setDateHandle = (ev: DateTimePickerEvent, date: Date) => {
    setIsOpen(false);
    onChange(date)
  }

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
      {Platform.OS === "ios" ? (
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%'}}>
          <RNDateTimePicker
            style={{minWidth: 130, maxWidth: 200}}
            accentColor="#00B700"
            value={value || placeholder}
            onChange={setDateHandle}
            onLayout={(ev) => console.log(ev.nativeEvent.layout)}
          />
        </View>
      ) : (
        <>
          <Pressable style={styles.main} onPress={pressHandle}>
            <Text style={!value ? styles.placeholderStyle : styles.dateStyle}>
              {!value ? formatDate(placeholder) : formatDate(value)}
            </Text>
          </Pressable>
          {isOpen && (
            <RNDateTimePicker
              accentColor="#00B700"
              value={value || placeholder}
              onChange={setDateHandle}
            />
          )}
        </>
      )}
    </>
  );
}
