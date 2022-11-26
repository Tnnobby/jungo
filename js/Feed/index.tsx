import { useEffect, useRef, useMemo } from "react";
import { ScrollView, StyleSheet, Animated, View, Platform } from "react-native";
import useFirebase from "../api/useFirebase";
import useOverlay from "../api/useOverlay";
import { LargeHeader } from "../components/header";
import FullSizeRecipeCard from "../components/RecipeCards/FullSizeRecipeCard";
import Page from "../Page";
import { PageProps } from "../../NavigationRouter";
import { Recipe } from "../api/firebase";
import NavigationPage from "../components/NavigationPage";

const styles = StyleSheet.create({
  main: {
    width: "100%",
    paddingTop: 20,
    // paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 20,
    // backgroundColor: "white",
  },
  scrollPlaceholder: {
    height: 40,
  },
  wrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});

interface FeedPageProps extends PageProps<'home'> {

}

export default function FeedPage({ navigation, ...props }: FeedPageProps) {
  const headerShadow = useRef(new Animated.Value(0)).current;
  const { getRecipes, recipes } = useFirebase();
  const { overlay, setOverlay } = useOverlay();

  useEffect(() => {
    getRecipes();
  }, []);

  const openViewRecipe = (data: Recipe) => {
    navigation.navigate('view-recipe', {data})
  };

  const openSearch = () => {
    // setOverlay({
    //   type: "fullpage",
    //   overlayElement: <SearchOverlay />,
    //   transitionIn: 'swipeLeft',
    //   transitionOut: 'swipeRight'
    // })
    navigation.navigate('search')
  } 

  const scrollHandle = ({ nativeEvent }) => {
    const y = nativeEvent.contentOffset.y;
    typeof y === "number" && headerShadow.setValue(y);
  };
  
  const animatedStyle =
    Platform.OS === "ios"
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          // shadowOpacity: 0.34,
          // // shadowRadius: 6.27,
          shadowOpacity: headerShadow.interpolate({
            inputRange: [0, 0, 40],
            outputRange: [0, 0, 0.34],
            extrapolate: 'clamp'
          }),
          shadowRadius: headerShadow.interpolate({
            inputRange: [0, 10, 40],
            outputRange: [0, 0, 6.27],
            extrapolate: "clamp",
          }),
        }
      : {
          elevation: headerShadow.interpolate({
            inputRange: [0, 10, 40],
            outputRange: [0, 0, 10],
            extrapolate: "clamp",
          }),
        };

  return (
    <NavigationPage>
      <LargeHeader
        style={animatedStyle}
        profilePic={true}
        searchButton={true}
        onSearchPress={openSearch}
        headerText="Home"
        notificationButton={false}
        onProfilePicPress={() => {}}
      />
      <ScrollView
        style={styles.main}
        onScroll={scrollHandle}
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          {recipes &&
            recipes.map((recipe) => (
              <FullSizeRecipeCard
                key={`recipe_card_${recipe.id}`}
                data={recipe}
                onPress={openViewRecipe}
              />
            ))}
          <View style={styles.scrollPlaceholder} />
        </View>
      </ScrollView>
      {overlay}
    </NavigationPage>
  );
}
