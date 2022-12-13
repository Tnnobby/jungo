import { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setNewRecipeField } from "../../redux/reducers/newRecipeReducer";
import { AddRecipePageProps } from "../../routes/routes";
import Bedsheet from "../components/Bedsheet";
import { BedsheetRef } from "../components/Bedsheet/bedsheet";
import ActionRow from "../components/Bedsheet/ActionRow";
import NutritionTable from "../components/bedsheets/NutritionTable";

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
    width: "100%",
    // backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: "center",
  },
  header: {
    fontFamily: "Rubik_500",
    fontSize: 22,
    marginBottom: 20,
  },
});

type NutritionDetailsBedsheetProps = AddRecipePageProps<'nutrition-bedsheet'>

export default function NutritionDetailsBedsheet({
  navigation,
  route
}: NutritionDetailsBedsheetProps) {
  const { initialValue } = route.params;
  const [nutritionValues, setNutritionValues] = useState(initialValue);
  const dispatch = useDispatch();
  const bedsheetRef = useRef<BedsheetRef>()

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
    dispatch(setNewRecipeField({nutrition_facts:nutritionValues}))
    bedsheetRef.current.close()
  };
  const cancelHandle = () => bedsheetRef.current.close();

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
    <Bedsheet ref={bedsheetRef}>
      <View style={styles.main}>
        <Text style={styles.header}>Nutrition Information</Text>
        <NutritionTable data={data} updateValue={updateRowHandle} />
        <ActionRow doneHandle={doneHandle} cancelHandle={cancelHandle} />
      </View>
    </Bedsheet>
  );
}
