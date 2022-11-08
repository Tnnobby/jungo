import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Platform, Keyboard } from "react-native";
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

export default function FormDateInput({
  onChange,
  date: initialDate,
  placeholder,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(initialDate);
  const { setBedsheet } = useOverlay();
  const pressHandle = () => {
    Keyboard.dismiss()
    setIsOpen(true);
  };

  const androidChangeHandle = (_, val) => {
    setIsOpen(false);
    onChange && onChange(val);
    setDate(val);
  };

  const formatDate = (date) => {
    return `${
      MONTHS[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  /* IOS Implementation */
  useEffect(() => {
    if (isOpen && Platform.OS === "ios") {
      setBedsheet({
        element: <DatePicker onClose={() => setIsOpen(false)} />,
        onChange: (val) => {
          onChange && onChange(val)
          setDate(val)
        }
      });
    }
  }, [isOpen]);

  return (
    <>
      <Pressable style={styles.main} onPress={pressHandle}>
        <Text
          style={
            date === initialDate ? styles.placeholderStyle : styles.dateStyle
          }
        >
          {date === initialDate ? formatDate(placeholder) : formatDate(date)}
        </Text>
      </Pressable>
      {Platform.OS !== "ios" && isOpen && (
        <RNDateTimePicker
          accentColor="#00B700"
          value={date || placeholder}
          onChange={androidChangeHandle}
        />
      )}
    </>
  );
}
