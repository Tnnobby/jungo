import { SmallHeader } from "../header";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Search from "../Search";
import SearchResultRecipeCard from "../RecipeCards/SearchResultRecipeCard";
import useFirebaseRecipes from "../../hooks/useFirebaseRecipes";
import useOverlay from "../../api/useOverlay";
import ViewRecipe from "./ViewRecipe";
import { RecipeData } from "../../types/RecipeTypes";
import { RootPageProps } from "../../../routes/RootRouter";
import NavigationPage from "../NavigationPage";

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
  bodyHead: {
    flexDirection: "column",
    marginVertical: 20,
  },
  headText: {
    fontFamily: "Rubik_500",
    fontSize: 30,
    marginBottom: 10,
  },
});

interface SearchOverlayProps extends RootPageProps<"search"> {}

export default function SearchOverlay({
  navigation,
  ...props
}: SearchOverlayProps) {
  const { recipes, searchRecipes, clearRecipes } = useFirebaseRecipes();
  const { overlay, setOverlay } = useOverlay();

  const searchHandle = (val: string) => {
    if (val === "") {
      clearRecipes();
    } else {
      searchRecipes(val.toLowerCase());
    }
  };

  const cardHandle = (data: RecipeData) => {
    setOverlay({
      type: "fullpage",
      overlayElement: <ViewRecipe data={data} />,
      transitionIn: "swipeUp",
      transitionOut: "swipeDown",
      useHeader: false,
      transitionSettings: {
        transitionIn: "swipeUp",
        transitionOut: "swipeDown",
        transitionTiming: 200,
      },
    });
  };

  return (
    <NavigationPage>
      <SmallHeader backButtonShown={true} backText="Home"/>
      <View style={styles.main}>
        <View style={styles.bodyHead}>
          <Text style={styles.headText}>Search</Text>
          <Search onChangeText={searchHandle} />
        </View>
        <FlatList
          data={recipes && recipes}
          renderItem={(item) => (
            <SearchResultRecipeCard data={item.item} onPress={cardHandle} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {overlay}
    </NavigationPage>
  );
}
