import { useEffect } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import { RootPageProps } from "../../routes/routes";
import { HourMinuteTime, Recipe } from "../api/firebase";
import { useFirebaseImage } from "../api/useFirebaseImage";
import { Header } from "../components/header";
import { SMALL_HEADER_HEIGHT } from "../components/header/small";
import NavigationPage from "../components/NavigationPage";
import CooktimeIcon from "../svg/jsx/CooktimeIcon";
import FireIcon from "../svg/jsx/FireIcon";
import { NutritionFact } from "./NutritionFact";

const styles = StyleSheet.create({
  body: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  image: {
    backgroundColor: "white",
    marginTop: SMALL_HEADER_HEIGHT,
  },
  recipeTitle: {
    fontSize: 30,
    marginBottom: 10,
    fontFamily: "Rubik_500",
  },
  sectionHead: {
    fontFamily: "Rubik_500",
    fontSize: 20,
    marginVertical: 10,
  },
  sectionBody: {
    flexDirection: "column",
  },
  item: {
    fontFamily: "Rubik_400",
    fontSize: 16,
  },
  instructionNumber: {
    fontSize: 16,
    fontFamily: "Rubik_500",
    marginHorizontal: 6,
  },
  bullet: {
    height: 8,
    width: 8,
    borderRadius: 100,
    backgroundColor: "black",
    marginTop: 4,
    marginHorizontal: 6,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
  },
});

interface ViewRecipeProps extends RootPageProps<"view-recipe"> {
  data?: Recipe;
}

export default function ViewRecipe({ navigation, route }: ViewRecipeProps) {
  const { data } = route.params;
  const headerStyle = useSharedValue<ViewStyle>({
    backgroundColor: "rgba(255,255,255, 1)",
  });
  const dimensions = useWindowDimensions();
  const { getImg, imgUrl } = useFirebaseImage()

  useEffect(() => {
    getImg(data.details.photo)
  }, [])

  const formatTime = (time: HourMinuteTime) => {
    let _return = "";
    _return += time.hours ? time.hours + " hr " : "";
    _return += time.minutes ? time.minutes + " min" : "";
    return _return;
  };

  const scrollHandle = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    headerStyle.value = {
      backgroundColor: `rgba(255,255,255, ${
        1 *
        Math.max(
          (SMALL_HEADER_HEIGHT - e.nativeEvent.contentOffset.y) /
            SMALL_HEADER_HEIGHT
        )
      })`,
    };
  };

  return (
    <NavigationPage keyboardSafe={false}>
      <Header
        closeButtonShown={true}
        animatedStyle={headerStyle}
        overlapHeader={true}
      />
      <ScrollView onScroll={scrollHandle} scrollEventThrottle={16}>
        <Animated.View
          style={{
            ...styles.image,
            height: dimensions.width,
            width: dimensions.width,
          }}
        >
          {imgUrl && <Image
            style={{ height: "100%", width: "100%" }}
            source={{
              uri: imgUrl,
            }}
          />}
        </Animated.View>

        <View style={styles.body}>
          <Text style={styles.recipeTitle}>{data.details.title}</Text>
          <View style={styles.row} /* Preheat / Cooktime */>
            <View style={{ ...styles.itemRow, marginRight: 24 }}>
              <CooktimeIcon fill="black" style={{ marginRight: 6 }} />
              <Text style={styles.item}>
                {formatTime(data.details.preptime)}
              </Text>
            </View>
            <View style={styles.itemRow}>
              <FireIcon fill="black" scale={1.2} style={{ marginRight: 6 }} />
              <Text style={styles.item}>
                {formatTime(data.details.cooktime)}
              </Text>
            </View>
          </View>
          <View style={styles.row} /* Nutrition Facts */>
            <NutritionFact
              color="#4F9DA6"
              data={data.details.nutrition_facts.protein}
              unit="g"
            />
            <NutritionFact
              color="#233142"
              data={data.details.nutrition_facts.calories}
              unit="cal"
            />
            <NutritionFact
              color="#FF5959"
              data={data.details.nutrition_facts.fats}
              unit="g"
            />
            <NutritionFact
              color="#FACF5A"
              data={data.details.nutrition_facts.carbs}
              unit="g"
            />
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.sectionHead}>Description</Text>
            <Text style={styles.item}>{data.details.description}</Text>
          </View>
          <View style={styles.sectionBody} /* Ingredients */>
            <Text style={styles.sectionHead}>Ingredients</Text>
            {data.details.ingredients.map((ingredient, index) => (
              <View style={styles.itemRow} key={`ingredient_item_${index}`}>
                <Bullet />
                <Text key={`ingredient_${index}`} style={styles.item}>
                  {" "}
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.sectionBody}>
            <Text style={styles.sectionHead}>Instructions</Text>
            {data.details.instructions.map((instruction, index) => (
              <View style={styles.itemRow} key={`instruction_item_${index}`}>
                <Text style={styles.instructionNumber}>{`${index + 1}. `}</Text>
                <Text style={styles.item}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </NavigationPage>
  );
}

const Bullet = () => <View style={styles.bullet} />;
