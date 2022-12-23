import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useCallback, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { useDispatch } from "react-redux";
import { setNewRecipeField } from "../../redux/reducers/newRecipeReducer";
import { AddRecipePageProps } from "../../routes/routes";
import Bedsheet from "../components/Bedsheet";
import ActionRow from "../components/Bedsheet/ActionRow";
import { BedsheetRef } from "../components/Bedsheet/bedsheet";

const initialTime = (hours: number = 0, minutes: number = 0) => {
  const _d = new Date();
  _d.setHours(hours, minutes);
  return _d;
};

type TimerBedsheetProps = AddRecipePageProps<"timer-bedsheet">;

export default function TimerBedsheet({
  navigation,
  route,
}: TimerBedsheetProps) {
  const {
    initialValue: { hours, minutes },
    fieldName,
  } = route.params;
  const bedsheetRef = useRef<BedsheetRef>();
  const [time, setTime] = useState<Date>(initialTime(hours, minutes));
  const dispatch = useDispatch();

  console.log(navigation.canGoBack());

  const close = () => {
    if (Platform.OS === "ios") bedsheetRef.current.close();
    if (Platform.OS === "android") navigation.goBack();
  };

  const cancelHandle = () => close();
  const doneHandle = (_time?: Date) => {
    const newTime = _time || time
    dispatch(
      setNewRecipeField({
        [fieldName]: {
          hours: newTime.getHours(),
          minutes: newTime.getMinutes(),
        },
      })
    );
    close();
  };

  const renderIOS = useCallback(() => {
    return (
      <Bedsheet ref={bedsheetRef}>
        <RNDateTimePicker
          mode="time"
          display="spinner"
          locale="en_GB"
          is24Hour={true}
          themeVariant="light"
          value={time}
        />
        <ActionRow onCancel={cancelHandle} onDone={doneHandle} />
      </Bedsheet>
    );
  }, []);

  const renderAndroid = useCallback(() => {
    return (
      <RNDateTimePicker
        mode="time"
        display="clock"
        value={time}
        onError={() => console.log("error")}
        onChange={(ev, date) => {
          ev.type === "dismissed" && cancelHandle();
          ev.type === "set" && doneHandle(date);
        }}
        is24Hour={true}
      />
    );
  }, []);

  return Platform.OS === "ios" ? renderIOS() : renderAndroid();
}
