import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useCallback, useRef, useState } from "react";
import { Platform } from "react-native";
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
  const time = useRef(initialTime(hours, minutes));
  const dispatch = useDispatch();

  console.log(navigation.canGoBack());

  const close = () => {
    if (Platform.OS === "ios") bedsheetRef.current.close();
    if (Platform.OS === "android") navigation.goBack();
  };

  const cancelHandle = () => close();

  const androidDone = (_time?: Date) => {
    dispatch(
      setNewRecipeField({
        [fieldName]: {
          hours: _time.getHours(),
          minutes: _time.getMinutes(),
        },
      })
    );
    close();
  };
  const iosDone = () => {
    const newTime = {
      hours: time.current.getHours(),
      minutes: time.current.getMinutes(),
    };
    dispatch(
      setNewRecipeField({
        [fieldName]: newTime,
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
          value={time.current}
          onChange={(ev, _time) => {
            time.current = _time;
          }}
        />
        <ActionRow onCancel={cancelHandle} onDone={iosDone} />
      </Bedsheet>
    );
  }, []);

  const renderAndroid = useCallback(() => {
    return (
      <RNDateTimePicker
        mode="time"
        display="clock"
        value={time.current}
        onError={() => console.log("error")}
        onChange={(ev, date) => {
          ev.type === "dismissed" && cancelHandle();
          ev.type === "set" && androidDone(date);
        }}
        is24Hour={true}
      />
    );
  }, []);

  return Platform.OS === "ios" ? renderIOS() : renderAndroid();
}
