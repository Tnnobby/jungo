import { useRef } from "react";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { StyleSheet, View } from "react-native";
import ActionRow from "../Bedsheet/ActionRow";
import { LoginPageProps } from "../../../routes/routes";
import { Bedsheet, BedsheetRef } from "../Bedsheet/bedsheet";
import { useLoginContext } from "../../context-providers/LoginContextType";

const styles = StyleSheet.create({
  main: {},
});

// export interface DatePickerProps {
//   close?: () => void;
//   onChange?: (val: Date) => void;
//   initialValue?: Date;
//   onClose?: () => void;
// }

type DatePickerProps = LoginPageProps<"date-bedsheet">;

export const DatePicker: React.FC<DatePickerProps> = ({
  route,
}) => {
  const { initialValue } = route.params;
  const val = useRef<Date>(initialValue);
  const { setBirthday } = useLoginContext();
  const bedsheetRef = useRef<BedsheetRef>();

  const changeHandle = (_: DateTimePickerEvent, date: Date) => {
    val.current = date;
  };

  const doneHandle = () => {
    setBirthday(val.current);
    bedsheetRef.current.close();
  };

  const cancelHandle = () => bedsheetRef.current.close();

  return (
    <Bedsheet ref={bedsheetRef}>
      <RNDateTimePicker
        value={initialValue}
        onChange={changeHandle}
        mode={"date"}
        display={"spinner"}
        style={styles.main}
      />
      <ActionRow onCancel={cancelHandle} onDone={doneHandle} />
    </Bedsheet>
  );
};
