import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Recipe } from "./js/api/firebase";
import { ErrorHandler } from "./js/components/ErrorHandler";
import SearchOverlay from "./js/components/hook-fullpage/SearchOverlay";
import FeedPage from "./js/Feed";
import Profile from "./js/profile";
import ViewRecipe from "./js/ViewRecipe";

export type StackType = {
  home: undefined;
  profile: undefined;
  search: undefined;
  "view-recipe": { data: Recipe };
};

export type PageProps<R extends keyof StackType> = NativeStackScreenProps<
  StackType,
  R
>;

const Stack = createNativeStackNavigator<StackType>();

export default function NavigationRouter() {
  const unhandledHandle = (err) => {
    console.log("Unhandled Route:", err);
  };

  return (
    <ErrorHandler>
      <NavigationContainer onUnhandledAction={unhandledHandle}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={FeedPage} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Group
            screenOptions={{
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
              animationDuration: 150,
            }}
          >
            <Stack.Screen name="search" component={SearchOverlay} />
            <Stack.Screen name="view-recipe" component={ViewRecipe} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorHandler>
  );
}
