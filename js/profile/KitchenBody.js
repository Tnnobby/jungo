import { ScrollView, StyleSheet, View } from "react-native";
import Carousel from "../components/carousel/Carousel";
import Filter from "../components/filter/Filter";
import RecipeCarousel from "../components/RecipeCarousel";

const styles = StyleSheet.create({
  main: {
    flexDirection: "column",
  },
});

const FAVORITE_RECIPES = [
  {
    id: 25,
    title: "Crepes",
    image_uri:
      "https://cdn.pixabay.com/photo/2017/01/30/13/49/pancakes-2020863__480.jpg",
  },
  {
    id: 10,
    title: "Berries",
    image_uri:
      "https://cdn.pixabay.com/photo/2010/12/13/10/05/berries-2277__480.jpg",
  },
  {
    id: 14,
    title: "Ice Cream",
    image_uri:
      "https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-1274894__340.jpg",
  },
  {
    id: 1006,
    title: "Brown Food",
    image_uri:
      "https://cdn.pixabay.com/photo/2017/12/01/16/14/cookies-2991174__480.jpg",
  },
  {
    id: 2,
    title: "Apple Book",
    image_uri:
      "https://cdn.pixabay.com/photo/2014/02/01/17/28/apple-256261__480.jpg",
  },
];
const COLLECTIONS = [
  {
    id: 2,
    bgColor: '#FF9757',
    fontColor: '#FFFFFF',
    icon: null,
    text: 'Breakfast'
  },
  {
    id: 1039,
    bgColor: '#498CF7',
    fontColor: '#FFFFFF',
    icon: null,
    text: 'Lunch'
  },
  {
    id: 346,
    bgColor: '#4BBC41',
    fontColor: '#FFFFFF',
    icon: null,
    text: 'Snack'
  },
  {
    id: 1048,
    bgColor: '#DE4A4A',
    fontColor: '#FFFFFF',
    icon: null,
    text: 'Dinner'
  },
  {
    id: 1011,
    bgColor: '#7C4898',
    fontColor: '#FFFFFF',
    icon: null,
    text: 'Vegan'
  }
]

export default function KitchenBody(props) {
  return (
    <View style={styles.main}>
      <Carousel
      title='Favorite Recipes'
      recipes={FAVORITE_RECIPES}
      />
      <Filter
        title="Collections"
        filters={COLLECTIONS}
      />
    </View>
  );
}
