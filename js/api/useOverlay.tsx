import { useState } from "react";
import FullPage from "../components/hookOverlays/FullPage";
import { TransitionOptions, TransitionSettings } from "../components/TransitionManager/type";

export default function useOverlay() {
  const [render, setRender] = useState(null);

  const setOverlay = ({
    type,
    overlayElement,
    useHeader = false,
    transitionIn = "swipeUp",
    transitionOut = "swipeDown",
    transitionSettings
  }: {
    type: "fullpage" | null;
    overlayElement: JSX.Element;
    useHeader: boolean;
    transitionIn: TransitionOptions;
    transitionOut: TransitionOptions;
    transitionSettings?: TransitionSettings
  }) => {
    switch (type) {
      case "fullpage":
        setRender(
          <FullPage
            useHeader={useHeader}
            onClose={onCloseHandle}
            transitionIn={transitionIn}
            transitionOut={transitionOut}
          >
            {overlayElement}
          </FullPage>
        );
        break;
      default:
        break;
    }
  };

  const onCloseHandle = () => {
    setRender(null);
  };

  return {
    overlay: render,
    setOverlay,
  };
}
