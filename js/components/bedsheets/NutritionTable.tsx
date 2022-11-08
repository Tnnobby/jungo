import { useRef } from "react";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import constants from "../../constants";

const styles = StyleSheet.create({
  tableMain: {
    flexDirection: "column",
    paddingHorizontal: 20,
    width: "100%",
    // backgroundColor: 'red'
  },

  rowMain: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorIndicator: {
    height: 26,
    width: 4,
    borderRadius: 100,
    marginRight: 14,
  },
  titleText: {
    fontFamily: "Rubik_500",
    fontSize: 18,
  },
  rowFront: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rowBack: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  inputText: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: "Rubik_500",
  },
});

const NutritionTable = ({ data, updateValue, ...props }) => (
  <View style={styles.tableMain}>
    {data.map((item, index) => (
      <NutritionRow
        key={`row_${item.key}`}
        index={index}
        data={item}
        update={updateValue}
      />
    ))}
  </View>
);

const NutritionRow = ({ data, update, index, ...props }) => {
  const inputRef = useRef<TextInput>();
  const changeHandle = (text: string) => {
    const _t = {}
    _t[data.key] = text;
    update(_t);
  };
  const inputPress = () => inputRef?.current?.focus()

  return (
    <View style={styles.rowMain}>
      <View style={styles.rowFront}>
        <View
          style={{ ...styles.colorIndicator, backgroundColor: data.color }}
        />
        <Text style={styles.titleText}>{data.title}</Text>
      </View>
      <Pressable style={styles.rowBack} onPress={inputPress}>
        <TextInput
          style={styles.inputText}
          defaultValue={data.initialValue.toString()}
          keyboardType={"number-pad"}
          onChangeText={changeHandle}
          selectTextOnFocus={true}
          selectionColor='rgba(73, 140, 247, 0.3)'
          ref={inputRef}
        />
        <Text style={styles.inputText}> {data.unit}</Text>
      </Pressable>
    </View>
  );
};

export default NutritionTable;
