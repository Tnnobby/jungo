import AddRecipe from "./js/AddRecipe";
import Preheat from "./js/components/bedsheets/Preheat";
import Timer from "./js/components/bedsheets/Timer.old";
import Profile from "./js/profile";
import InstructionEdit from "./js/components/fullpage/InstructionEdit";
import NutritionDetails from "./js/components/bedsheets/NutritionDetails";
import RearrangeablePage from "./js/RearrangeablePage";
import ViewRecipe from "./js/ViewRecipe";
import LoginPage from "./js/LoginPage";
import FeedPage from "./js/Feed";
import { TransitionManager } from "./js/components/TransitionManager";
import { buildOverlays, buildRoutes } from "./js/components/TransitionManager/tools";
import LoginMainPage from "./js/LoginPage/screens/LoginPage";
import SignUpPage from "./js/LoginPage/screens/SignUpPage";
import LoginSplash from "./js/LoginPage/screens/LoginSplash";
import UserInfoPage from "./js/LoginPage/screens/UserInfoPage";

export default function Router(props) {
  const initialPage = "add_recipe";

  const ROUTES = {
    profile: <Profile />,
    add_recipe: <AddRecipe />,
    view_recipe: <ViewRecipe />,
    rearrangeable: <RearrangeablePage />,
    login: <LoginPage />,
    feed: <FeedPage />,
    login_splash: <LoginSplash />,
    login_login: <LoginMainPage />,
    login_signup: <SignUpPage />,
    login_userinfo: <UserInfoPage />
  };

  const BEDSHEETS = {
    preheat: <Preheat />,
    timer: <Timer />,
    nutrition: <NutritionDetails />,
  };

  const FULLPAGEOVERLAYS = {
    instructionedit: <InstructionEdit />,
  };

  return (
    <>
      <TransitionManager
        initial={initialPage}
        routes={buildRoutes(ROUTES)}
        overlays={buildOverlays({bedsheets: BEDSHEETS, fullscreens: FULLPAGEOVERLAYS})}
      />
    </>
  );
}
