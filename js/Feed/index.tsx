import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Animated,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { LargeHeader } from "../components/header";
import FullSizeRecipeCard from "../components/RecipeCards/FullSizeRecipeCard";
import { Recipe } from "../api/firebase";
import NavigationPage from "../components/NavigationPage";
import { RootPageProps } from "../../routes/routes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useFirebaseRecipes from "../api/useFirebaseRecipes";
import { RefreshController } from "../components/RefreshController";
import { RefreshControl } from "react-native-gesture-handler";
import { LARGE_HEADER_HEIGHT } from "../components/header/large";

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

interface FeedPageProps extends RootPageProps<"home"> {}

export default function FeedPage({ navigation, ...props }: FeedPageProps) {
  const headerShadow = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { getRecipes, recipes } = useFirebaseRecipes();

  useEffect(() => {
    getRecipes();
  }, []);

  const refreshHandle = () => {
    setRefreshing(true)
    getRecipes()
      .then(() => setRefreshing(false))
  }

  const openViewRecipe = (data: Recipe) => {
    navigation.navigate("view-recipe", { data });
  };

  const openSearch = () => {
    navigation.navigate("search");
  };

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
            height: 8,
          },
          // shadowOpacity: 0.34,
          // // shadowRadius: 6.27,
          shadowOpacity: headerShadow.interpolate({
            inputRange: [0, 0, 40],
            outputRange: [0, 0, 0.34],
            extrapolate: "clamp",
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

  const profileOpenHandle = () => {
    console.log("open profile");
    navigation.navigate("profile");
  };

  return (
    <NavigationPage
      edges={Platform.OS === "ios" ? ["bottom", "left", "right"] : undefined}
    >
      <LargeHeader
        style={animatedStyle}
        profilePic={true}
        searchButton={true}
        onSearchPress={openSearch}
        headerText="Home"
        notificationButton={false}
        onProfilePicPress={profileOpenHandle}
        navColor={Platform.OS === "ios" ? "white" : undefined}
      />
      <ScrollView
        style={styles.main}
        onScroll={scrollHandle}
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
        onLayout={(ev) => console.log(ev.nativeEvent.layout)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshHandle}
            progressViewOffset={LARGE_HEADER_HEIGHT / 2}
          />
        }
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
    </NavigationPage>
  );
}
