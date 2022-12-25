import AnimatedLottieView from "lottie-react-native";
import { useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { HourMinuteTime, Recipe } from "../../api/firebase";
import { useFirebaseImage } from "../../api/useFirebaseImage";
import ChefHat from "../../svg/jsx/ChefHat";
import { NutritionFact } from "../../ViewRecipe/NutritionFact";

const styles = StyleSheet.create({
  main: {
    width: "100%",
    // backgroundColor: 'red',
    // overflow: "hidden",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: "white",
    marginBottom: 24,
  },
  pressable: {
    backgroundColor: "transparent",
    overflow: 'hidden',
    borderRadius: 12
  },
  cardBody: {
    flexDirection: "column",
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik_500",
  },
  image: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'red'
  },
  timeRow: {
    marginVertical: 8,
    flexDirection: "row",
  },
  fact: {
    marginRight: 8,
  },
  chefCont: {
    height: 16,
    width: 16,
    marginRight: 3,
  },
  cookTime: {
    fontSize: 14,
    fontFamily: "Rubik_400",
    lineHeight: 18,
  },
  imgPlaceholder: {},
});

const DATA = {
  photo:
    "https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174__480.jpg",
  recipe_title: "Orange Juice",
  nutrition_facts: {
    protein: 15,
    calories: 1000,
    fats: 12,
    carbs: 200,
  },
};

export interface FullSizeRecipeCardProps {
  data?: Recipe;
  onPress?: (data: Recipe) => void;
}

export default function FullSizeRecipeCard({
  data,
  // imageSize = Dimensions.get("screen").width - 40,
  onPress,
  ...props
}: FullSizeRecipeCardProps) {
  const { getImg, imgUrl } = useFirebaseImage();
  const dimensions = useWindowDimensions()
  const imageSize = dimensions.width - 40

  useEffect(() => {
    data.details.photo && getImg(data.details.photo);
  }, []);

  const formatTime = (time: HourMinuteTime) => {
    let _return = "";
    _return += time.hours ? time.hours + " hr " : "";
    _return += time.minutes ? time.minutes + " min" : "";
    return _return;
  };

  const pressHandle = () => {
    onPress(data);
  };

  return (
    <View style={styles.main} >
      <Pressable style={styles.pressable} onPress={pressHandle}>
        {imgUrl ? (
          <Image
            style={styles.image}
            source={{
              uri: imgUrl,
              height: imageSize,
              width: imageSize,
            }}
          />
        ) : (
          <View
            style={{
              height: imageSize,
              width: imageSize,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AnimatedLottieView
              autoPlay={true}
              style={{
                height: 100,
                width: 100,
              }}
              source={require("../../lottie/loading.json")}
            />
          </View>
        )}
        <View style={styles.cardBody}>
          <Text style={styles.title}>{data.details.title || "No Title"}</Text>
          <View style={styles.bottomRow}>
            <View style={styles.row} /* Nutrition Facts */>
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
            <View style={styles.timeRow}>
              <View style={styles.chefCont}>
                <ChefHat fill="black" />
              </View>
              <Text style={styles.cookTime}>
                {formatTime(data.details.cooktime)}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
