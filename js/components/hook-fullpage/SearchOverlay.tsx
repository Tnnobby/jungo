import { SmallHeader } from "../header";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Search from "../Search";
import SearchResultRecipeCard from "../RecipeCards/SearchResultRecipeCard";
import useFirebase from "../../api/useFirebase";
import useOverlay from "../../api/useOverlay";
import ViewRecipe from "./ViewRecipe";
import { RecipeData } from "../../types/RecipeTypes";

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
  bodyHead: {
    flexDirection: "column",
    marginVertical: 20
  },
  headText: {
    fontFamily: "Rubik_500",
    fontSize: 30,
    marginBottom: 10,
  },
});

export default function SearchOverlay({ close, ...props }) {
  const { recipes, searchRecipes, clearRecipes } = useFirebase()
  const { overlay, setOverlay} = useOverlay()

  const backHandle = () => {
    close();
  };

  const searchHandle = (val: string) => {
    if (val === '') {
      clearRecipes()
    } else {
      searchRecipes(val.toLowerCase())
    }
  }

  const cardHandle = (data: RecipeData) => {
    setOverlay({
      type: 'fullpage',
      overlayElement: <ViewRecipe data={data}/>,
      transitionIn: 'swipeUp',
      transitionOut: 'swipeDown',
      useHeader: false,
      transitionSettings: {
        transitionIn: 'swipeUp',
        transitionOut: 'swipeDown',
        transitionTiming: 200,
      }
    })
  }

  return (
    <View style={{height:'100%'}}>
      <>
        <SmallHeader backButton={true} backText="Home" onBackPress={backHandle} />
        <View style={styles.main}>
          <View style={styles.bodyHead}>
            <Text style={styles.headText}>Search</Text>
            <Search onChangeText={searchHandle}/>
          </View>
          <FlatList
            data={recipes && recipes}
            renderItem={(item) => <SearchResultRecipeCard data={item.item} onPress={cardHandle}/>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </>
      {overlay}
    </View>
  );
}
