type TransitionOptions =
  | "swipeUp"
  | "swipeDown"
  | "swipeLeft"
  | "swipeRight"
  | "instant";
type AnimateToOptions = "top" | "bottom" | "left" | "right" | "center";
type TransitionStyleOptions = "timing" | "spring";
type TransitionInOptions = "top" | "bottom" | "left" | "right";

interface OutTransitionSettings {
  transitionOut?: TransitionOptions;
  transitionTiming?: number;
  transitionStyle?: TransitionStyleOptions;
}

interface TransitionSettings {
  transitionIn?: TransitionOptions;
  animateTo?: AnimateToOptions;
  transitionOut?: TransitionOptions;
  transitionTiming?: number;
  transitionStyle?: TransitionStyleOptions;
  halfswipe?: boolean;
  animateFrom?: AnimateToOptions;
}

type Overlays = Overlay[]
interface Overlay {
  type: "bedsheet" | "fullscreen";
  content: JSX.Element;
}



export {
  TransitionOptions,
  OutTransitionSettings,
  TransitionSettings,
  AnimateToOptions,
  TransitionStyleOptions,
  TransitionInOptions,
  Overlay,
  Overlays
};
