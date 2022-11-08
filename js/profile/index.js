import { ScrollView, StyleSheet, View } from "react-native";
import ProfileHeader from "./ProfileHeader";
import KitchenBody from "./KitchenBody";
import ProfileTabHeader from "./ProfileTabHeader";
import FloatingAddButton from "../components/AddButton";
import Page from "../Page";
import { Header } from "../components/header";
import { useNavigation } from "../hooks/useNavigation";
import { useSelector } from "react-redux";

const TEST_DATA = {
  user_id: 1,
  user_name: "Travis Nelson",
  user_bio: "If life gives you lemons, make lemonade! 🍋",
  following: false,
  notifications: false,
  followers_count: "103",
  recipes_count: "21",
  profile_pic_url:
    "https://m.media-amazon.com/images/M/MV5BNjZlODgzZTItZGRmYy00M2FhLWJjY2EtNjYyMzEzMWMwOWU2XkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_.jpg",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexGrow: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
  tabContainer: {
    marginTop: 30,
  },
});

export default function Profile(props) {
  // const [fontsLoaded] = useFonts({
  //   NotoSans:Rubik_400Regular,
  //   NotoSans_Bold:Rubik_700Bold
  // })
  const { toPage } = useNavigation();
  

  const onAddNewHandle = () => {
    toPage({
      toRoute: 'add_recipe',
    })
  };

  const rearrangeableHandle = () => {
    console.log("close pressed");
  };

  return (
    <Page id="profile" keyboardSafe={false} {...props}>
      <View style={styles.container}>
        <Header
          backButton={true}
          closeButton={true}
          onClosePress={rearrangeableHandle}
        />
        <ScrollView
          style={{
            ...styles.scrollview,
            width: "100%",
          }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeader {...TEST_DATA} />
          <View style={styles.tabContainer}>
            <ProfileTabHeader />
          </View>
          <KitchenBody />
        </ScrollView>
        <FloatingAddButton onPress={onAddNewHandle} />
      </View>
    </Page>
  );
}
