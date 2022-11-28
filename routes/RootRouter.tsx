import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Recipe } from "../js/api/firebase";
import { ErrorHandler } from "../js/components/ErrorHandler";
import SearchOverlay from "../js/components/hook-fullpage/SearchOverlay";
import LoadingHandler from "../js/components/Loading/LoadingHandler";
import FeedPage from "../js/Feed";
import Profile from "../js/profile";
import ViewRecipe from "../js/ViewRecipe";
import LoginRouter from "./LoginRouter";

export type RootStack = {
  login: undefined;
  home: undefined;
  profile: undefined;
  search: undefined;
  "view-recipe": { data: Recipe };
};

export type RootPageProps<R extends keyof RootStack> = NativeStackScreenProps<
  RootStack,
  R
>;

const Stack = createNativeStackNavigator<RootStack>();

export default function NavigationRouter() {
  const unhandledHandle = (err) => {
    console.log("Unhandled Route:", err);
  };

  return (
    <ErrorHandler>
      <LoadingHandler>
        <NavigationContainer onUnhandledAction={unhandledHandle}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="login"
          >
            <Stack.Screen name="login" component={LoginRouter} />

            <Stack.Screen name="home" component={FeedPage} />
            <Stack.Screen name="profile" component={Profile} />

            <Stack.Group
              screenOptions={{
                presentation: "fullScreenModal",
                animation: "slide_from_bottom",
                animationDuration: 150,
                gestureEnabled: true,
                gestureDirection: "vertical",
              }}
            >
              <Stack.Screen name="search" component={SearchOverlay} />
              <Stack.Screen name="view-recipe" component={ViewRecipe} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </LoadingHandler>
    </ErrorHandler>
  );
}
