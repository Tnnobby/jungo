import { useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useFirebaseImage } from "../../api/useFirebaseImage";
import { NutritionFact } from "../../ViewRecipe/NutritionFact";
import StatefulPressable from "../StatefulPressable";
import { Recipe } from "../../api/firebase";

const styles = StyleSheet.create({
  main: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 7,
  },
  photo: {
    borderRadius: 9,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Rubik_500",
  },
  detailsColumn: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  nutritionRow: {
    flexDirection: "row",
  },
  fact: {
    marginRight: 6,
  },
});

const DATA = {
  details: {
    photo:
      "https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174__480.jpg",
    title: "Orange Juice",
    nutrition_facts: {
      protein: 15,
      calories: 1000,
      fats: 12,
      carbs: 200,
    },
  },
};

type SearchResultRecipeCardProps = {
  onPress?: (data: Recipe) => void;
  data: Recipe;
};

export default function SearchResultRecipeCard({
  onPress,
  data,
}: SearchResultRecipeCardProps) {
  const { imgUrl, getImg } = useFirebaseImage();

  useEffect(() => {
    getImg(data.details.photo);
  }, []);

  const pressHandle = () => onPress(data);

  if (!data.details) return <></>;
  return (
    <StatefulPressable style={styles.main} onPress={pressHandle}>
      {imgUrl && (
        <Image
          style={styles.photo}
          source={{ uri: imgUrl, width: 58, height: 58 }}
        />
      )}
      <View style={styles.detailsColumn}>
        <Text style={styles.title}>{data.details.title}</Text>
        <View style={styles.nutritionRow}>
          <NutritionFact
            color="#4F9DA6"
            data={data.details.nutrition_facts.protein}
            unit="g"
            style={styles.fact}
            fontSize={14}
          />
          <NutritionFact
            color="#233142"
            data={data.details.nutrition_facts.calories}
            unit="cal"
            style={styles.fact}
            fontSize={14}
          />
          <NutritionFact
            color="#FF5959"
            data={data.details.nutrition_facts.fats}
            unit="g"
            style={styles.fact}
            fontSize={14}
          />
          <NutritionFact
            color="#FACF5A"
            data={data.details.nutrition_facts.carbs}
            unit="g"
            style={styles.fact}
            fontSize={14}
          />
        </View>
      </View>
    </StatefulPressable>
  );
}
