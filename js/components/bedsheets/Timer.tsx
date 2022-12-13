import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Device from 'expo-device';
import ActionRow from "../Bedsheet/ActionRow";

const styles = StyleSheet.create({
  body: {
    width: '100%',
    marginHorizontal: 15,
  }
})
export default function Timer ({onChange, close, cancel, initialValue, ...props}) {
  const [date, setDate] = useState(new Date(new Date().setHours(initialValue.hours, initialValue.minutes)));
  
  const changeHandle = (ev, d) => {
    setDate(d);
    onChange({
      hours: d.getHours(),
      minutes: d.getMinutes()
    })
  }

  const doneHandle = () => close()
  const cancelHandle = () => cancel()

  return (
    <View style={styles.body}>
      {Device.osName === 'iOS' && <RNDateTimePicker mode='countdown' value={date} display='spinner' onChange={changeHandle}/>}
      <ActionRow doneHandle={doneHandle} cancelHandle={cancelHandle}/>
    </View>
  )
}