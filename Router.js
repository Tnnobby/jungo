import { useSelector } from "react-redux";
import AddRecipe from "./js/AddRecipe";
import Bedsheet from "./js/components/Bedsheet";
import Preheat from "./js/components/bedsheets/Preheat";
import Timer from "./js/components/bedsheets/Timer";
import CameraOverlay from "./js/components/CameraOverlay";
import Profile from "./js/profile";
import FullPageOverlay from "./js/components/FullPageOverlay";
import InstructionEdit from "./js/components/fullpage/InstructionEdit";
import NutritionDetails from "./js/components/bedsheets/NutritionDetails";
import RearrangeablePage from "./js/RearrangeablePage";
import ViewRecipe from "./js/ViewRecipe";
import { useRef } from "react";
import useTransitions from "./js/hooks/useTransitions";
import LoginPage from "./js/LoginPage";
import LoadingOverlay from "./js/components/fullpage/loading";
import FeedPage from "./js/Feed";
import { TransitionManager } from "./js/components/TransitionManager";
import { buildOverlays, buildRoutes } from "./js/components/TransitionManager/tools";
import LoginMainPage from "./js/LoginPage/screens/LoginPage";
import SignUpPage from "./js/LoginPage/screens/SignUpPage";
import LoginSplash from "./js/LoginPage/screens/LoginSplash";
import UserInfoPage from "./js/LoginPage/screens/UserInfoPage";

export default function Router(props) {
  const { page, stack, state: navState } = useSelector((s) => s.navigation);
  const {
    overlay,
    id: overlayId,
    state: overlayState,
  } = useSelector((s) => s.overlay);
  const manager = useRef;
  const { initializeTransition, render, toScreen } = useTransitions();

  const initialPage = "login_splash";

  const cameraState = useSelector((s) => s.camera.state);

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
      {/* {routes[stack[stack.length - 1]]} */}
      <TransitionManager
        initial={initialPage}
        routes={buildRoutes(ROUTES)}
        overlays={buildOverlays({bedsheets: BEDSHEETS, fullscreens: FULLPAGEOVERLAYS})}
      />
      {/* {ROUTES[page]} */}
      {/* {overlayState === "bedsheet" && (
        <Bedsheet type={overlay} id={overlayId}>
          {BEDSHEETS[overlay]}
        </Bedsheet>
      )} */}
      {/* {overlayState === "fullpage" && (
        <FullPageOverlay type={overlay} id={overlayId}>
          {FULLPAGEOVERLAYS[overlay]}
        </FullPageOverlay>
      )} */}
      {/* {overlay === "loading" && <LoadingOverlay />} */}
      {/* <LoadingOverlay /> */}
      {/* {cameraState === "open" && <CameraOverlay />} */}
    </>
  );
}
