import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Device from 'expo-device';
import ActionRow from "./ActionRow";

const styles = StyleSheet.create({
  body: {
    width: '100%',
    marginHorizontal: 15,
  }
})
export default function Timer ({setValue, close, initialValue, ...props}) {
  console.log(initialValue);
  const [date, setDate] = useState(new Date(new Date().setHours(initialValue.hours, initialValue.minutes)));
  console.log(date);
  
  const changeHandle = (ev, d) => {
    setDate(d);
  }

  const doneHandle = () => {
    setValue({
      hours: date.getHours(),
      minutes: date.getMinutes()
    });
    close();
  }
  const cancelHandle = () => close()

  return (
    <View style={styles.body}>
      {Device.osName === 'iOS' && <RNDateTimePicker mode='countdown' value={date} display='spinner' onChange={changeHandle}/>}
      <ActionRow doneHandle={doneHandle} cancelHandle={cancelHandle}/>
    </View>
  )
}