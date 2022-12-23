import { SmallHeader } from "../header";
import { View, StyleSheet, Text, FlatList, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import Search from "../Search";
import SearchResultRecipeCard from "../RecipeCards/SearchResultRecipeCard";
import NavigationPage from "../NavigationPage";
import { RootPageProps } from "../../../routes/routes";
import { useEffect } from "react";
import { Recipe } from "../../api/firebase";
import useFirebaseRecipes from "../../api/useFirebaseRecipes";

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
  const { searchResults, searchRecipes, clearRecipes } = useFirebaseRecipes();

  const searchHandle = (ev: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const val = ev.nativeEvent.text

    if (val === "") {
      clearRecipes();
    } else {
      searchRecipes(val.toLowerCase());
    }
  };

  const cardHandle = (data: Recipe) => {
    navigation.navigate('view-recipe', {data})

    // setOverlay({
    //   type: "fullpage",
    //   overlayElement: <ViewRecipe data={data} />,
    //   transitionIn: "swipeUp",
    //   transitionOut: "swipeDown",
    //   useHeader: false,
    //   transitionSettings: {
    //     transitionIn: "swipeUp",
    //     transitionOut: "swipeDown",
    //     transitionTiming: 200,
    //   },
    // });
  };

  return (
    <NavigationPage>
      <SmallHeader backButtonShown={true} backText="Home"/>
      <View style={styles.main}>
        <View style={styles.bodyHead}>
          <Text style={styles.headText}>Search</Text>
          <Search onChange={searchHandle} />
        </View>
        <FlatList
          data={searchResults && searchResults}
          renderItem={(item) => (
            <SearchResultRecipeCard data={item.item} onPress={cardHandle} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </NavigationPage>
  );
}
