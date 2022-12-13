import { ScrollView, StyleSheet, View } from "react-native";
import ProfileHeader from "./ProfileHeader";
import KitchenBody from "./KitchenBody";
import ProfileTabHeader from "./ProfileTabHeader";
import FloatingAddButton from "../components/AddButton";
import Page from "../Page";
import { Header } from "../components/header";
import { UserDoc } from "../context-providers/FirebaseProvider";
import { RootPageProps } from "../../routes/routes";
import NavigationPage from "../components/NavigationPage";
import { SettingsButton } from "../components/buttons/SettingsButton";
import useFirebase from "../hooks/useFirebase";

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

interface ProfilePageProps extends RootPageProps<"profile"> {
  data: UserDoc;
}

// TODO : Finish converting this to use navigation and routes props
const ProfilePage = ({ data, navigation, route }: ProfilePageProps) => {
  const { actions } = useFirebase()

  const onAddNewHandle = () => {
    navigation.navigate('add-recipe')
  };

  const settingsHandle = () => {
    actions.logout()
  }

  return (
    <NavigationPage>
      <View style={styles.container}>
        <Header
          backButtonShown={true}
          closeButtonShown={false}
          onBackPress={undefined}
          onClosePress={undefined}
          rightComponent={<SettingsButton onPress={settingsHandle}/>}
        />
        <ScrollView
          style={{
            ...styles.scrollview,
            width: "100%",
          }}
          showsVerticalScrollIndicator={false}
          overScrollMode='never'
        >
          <ProfileHeader
            firstName={data.first_name}
            lastName={data.last_name}
          />
          <View style={styles.tabContainer}>
            <ProfileTabHeader />
          </View>
          <KitchenBody />
        </ScrollView>
        <FloatingAddButton onPress={onAddNewHandle} />
      </View>
    </NavigationPage>
  );
};

export default ProfilePage;
