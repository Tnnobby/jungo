import { useMemo, useRef } from "react";
import { useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../components/header";
import Page from "../Page";
import CooktimeIcon from "../svg/jsx/CooktimeIcon";
import FireIcon from "../svg/jsx/FireIcon";
import { NutritionFact } from "./NutritionFact";

const styles = StyleSheet.create({
  body: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  image: {
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
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

const DATA = {
  title: "Roasted Tomato Hummus",
  preheat: 350,
  cooktime: { hours: 2, minutes: 25 },
  preptime: { hours: 3, minutes: 1 },
  nutrition_facts: { calories: 243, fats: 20, carbs: 200, protein: 15 },
  ingredients: ["3 Oranges", "2 Gallons Milk"],
  description:
    "This is a description of a recipe that is literally just a bunch of unpeeled oranges... Not very apetizing...",
  instructions: [
    "In a large bowl blend the three oranges, do not peel the oranges as the peels are the most nutritious part of the orange.",
    "Then Eat the Oranges",
  ],
  photo: [],
};

export default function ViewRecipe({ data = DATA, ...props }) {
  const [isScrolledToTop, setIsScrolledToTop] = useState(false);
  const [translate, setTranslate] = useState(null);

  console.log(data);
  const pageResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () =>
          isScrolledToTop && translate !== null,
        onPanResponderGrant: () => console.log("granted responder"),
        onPanResponderMove:
          translate &&
          Animated.event([null, { dy: translate.y }], {
            useNativeDriver: false,
          }),
      }),
    [translate]
  );

  const formatTime = (time) => {
    let _return = "";
    _return += time.hours ? time.hours + " hr " : "";
    _return += time.minutes ? time.minutes + " min" : "";
    return _return;
  };

  const scrollHandle = ({ nativeEvent }) => {
    nativeEvent.contentOffset.y === 0 && setIsScrolledToTop(true);
    // translate !== null && Animated.spring(translate.translate, {
    //   toValue: {x: 0, y: -Dimensions.get('screen').height},
    //   useNativeDriver: true
    // })
  };

  const handleAnimatedProps = (animatedProps) => {
    console.log('setting translate')
    animatedProps.translate && setTranslate(animatedProps.translate);
  };

  return (
    <Page
      transition="swipeUp"
      useAnimatedProps={handleAnimatedProps}
      {...pageResponder.panHandlers}
    >
      <Header closeButton={true} />
      <ScrollView style={styles.main} onScroll={scrollHandle}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863__480.jpg",
          }}
        />
        <View style={styles.body}>
          <Text style={styles.recipeTitle}>{data.details.title}</Text>
          <View style={styles.row} /* Preheat / Cooktime */>
            <View style={{ ...styles.itemRow, marginRight: 24 }}>
              <CooktimeIcon fill="black" style={{ marginRight: 6 }} />
              <Text style={styles.item}>{formatTime(data.details.preptime)}</Text>
            </View>
            <View style={styles.itemRow}>
              <FireIcon fill="black" scale={1.2} style={{ marginRight: 6 }} />
              <Text style={styles.item}>{formatTime(data.details.cooktime)}</Text>
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
    </Page>
  );
}

const Bullet = () => <View style={styles.bullet} />;


