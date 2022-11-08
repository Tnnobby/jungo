import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import constants from "../../constants";
import GeneralStyles from "../GeneralStyles";

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginTop: 10,
    height: '100%',
  },
  editBox: {
    padding: 5,
    backgroundColor: "#F5F5F5",
    borderColor: "#B4B4B4",
    borderWidth: 1,
    borderRadius: 8,
    height: 150,
  },
  input: {
    fontSize: 14,
    marginHorizontal: 2
  },
  doneCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5
  },
  doneBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.primary_color,
    borderRadius: 100
  },
  doneTxt: {
    fontSize: 22,
    fontFamily: 'Rubik_500',
    color: 'white',
    paddingVertical: 3,
    paddingHorizontal: 20,
  }
})

const NULL_PLACEHOLDER = 'NEW_DESCRIPTION';

export default function InstructionEdit ({ setValue, close, title, initialValue, id, ...props}) {
  const [description, setDescription] = useState(initialValue);
  const editRef = useRef();

  const inputPress = () => editRef.current.focus();
  const doneHandle = () => {
    console.log(description);
    description !== NULL_PLACEHOLDER && setValue(description);
    close();
  }

  return (
    <View
      style={styles.main}
    >
      <Text style={{...GeneralStyles.header, color:constants.primary_color}}>Edit Step {parseInt(id.split('_')[1]) + 1}</Text>
      <Pressable style={styles.editBox} onPress={inputPress}>
        <TextInput
          placeholder={"Enter Description"}
          multiline={true}
          style={styles.input}
          ref={editRef}
          defaultValue={description === NULL_PLACEHOLDER ? null : description}
          onChangeText={setDescription}
        />
      </Pressable>
      <View style={styles.doneCont}>
        <Pressable style={styles.doneBtn} onPress={doneHandle}>
          <Text style={styles.doneTxt}>Done</Text>
        </Pressable>
      </View>
    </View>
  )
}