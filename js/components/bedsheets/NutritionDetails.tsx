import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import constants from "../../constants";
import GeneralStyles from "../GeneralStyles";
import ActionRow from "./ActionRow";
import NutritionTable from "./NutritionTable";

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    width: "100%",
    // backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: "center",
  },
  header: {
    fontFamily: "Rubik_400",
    fontSize: 22,
    marginBottom: 20,
  },
});

interface NutritionDetailsProps {
  close?: () => void;
  cancel?: () => void;
  initialValue?: any;
  onChange?: (val: any) => void
}

export default function NutritionDetails({
  close,
  onChange,
  cancel,
  initialValue,
  ...props
}: NutritionDetailsProps) {
  const [nutritionValues, setNutritionValues] = useState(initialValue);

  const updateRowHandle = (keyValuePair) => {
    console.log(keyValuePair);
    setNutritionValues((current) => {
      return {
        ...current,
        ...keyValuePair,
      };
    });
  };

  const doneHandle = () => {
    onChange(nutritionValues);
    close();
  };
  const cancelHandle = () => cancel();

  const data = [
    {
      title: "Calories",
      color: "#233142",
      unit: "cal",
      key: "calories",
      initialValue: initialValue.calories,
    },
    {
      title: "Carbs",
      color: "#FACF5A",
      unit: "g",
      key: "carbs",
      initialValue: initialValue.carbs,
    },
    {
      title: "Fats",
      color: "#FF5959",
      unit: "g",
      key: "fats",
      initialValue: initialValue.fats,
    },
    {
      title: "Protein",
      color: "#4F9DA6",
      unit: "g",
      key: "protein",
      initialValue: initialValue.protein,
    },
  ];

  return (
    <View style={styles.main}>
      <Text style={styles.header}>Nutrition Information</Text>
      <NutritionTable data={data} updateValue={updateRowHandle} />
      <ActionRow doneHandle={doneHandle} cancelHandle={cancelHandle} />
    </View>
  );
}
