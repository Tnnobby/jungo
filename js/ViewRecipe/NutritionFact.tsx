import { StyleSheet, Text, View, ViewProps } from "react-native";

const styles = StyleSheet.create({
  item: {
    fontFamily: "Rubik_400",
  },
  nutritionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    flexGrow: 1,
  },
  nutritionIndicator: {
    height: 18,
    width: 3,
    borderRadius: 100,
    marginRight: 3,
  },
});

export interface NutritionFactProps extends ViewProps {
  color?: string;
  data?: number | string;
  unit?: string;
  fontSize?: number;
}

export const NutritionFact = ({
  color,
  data,
  unit,
  style,
  fontSize = 16,
  ...props
}: NutritionFactProps) => (
  <View style={[ styles.nutritionRow, style ]} {...props}>
    <View style={{ ...styles.nutritionIndicator, backgroundColor: color }} />
    <Text style={{ ...styles.item, fontSize }}>
      {data} {unit}
    </Text>
  </View>
);
