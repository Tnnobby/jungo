import { useRef } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { StyleSheet, View } from "react-native";
import ActionRow from "./ActionRow";

const styles = StyleSheet.create({
  main: {},
});

export interface DatePickerProps {
  close?: () => void;
  onChange?: (val: Date) => void;
  initialValue?: Date;
  onClose?: () => void;
}

export function DatePicker({
  close,
  onChange,
  initialValue = new Date(),
  onClose,
  ...props
}: DatePickerProps) {
  const val = useRef<Date>(initialValue);

  const changeHandle = (_: DateTimePickerEvent, date: Date) => {
    console.log(date);
    val.current = date;
  };

  const doneHandle = () => {
    onChange && onChange(val.current);
    onClose && onClose();
    close();
  };

  const cancelHandle = () => {
    onClose && onClose();
    close();
  };

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <RNDateTimePicker
        value={initialValue}
        onChange={changeHandle}
        mode={"date"}
        display={"spinner"}
        style={styles.main}
      />
      <ActionRow cancelHandle={cancelHandle} doneHandle={doneHandle} />
    </View>
  );
}
