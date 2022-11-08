import React, { useCallback, useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const DEFAULT_TRANSITIONS = {
  forward: {
    animateTo: "left",
    animateStyle: "timing",
    animateTiming: 250,
  },
  backward: {
    animateTo: "right",
    animateStyle: "timing",
    animateTiming: 250,
  },
};

/**
 * @param {} param0 initial settings
 * @returns
 */
export default function useTransitions({
  initialTransition,
  initialPage,
  ...params
} = {}) {
  /** JSX.Element of last element (Currently rendered) */
  const [initialized, setInitialized] = useState(false);
  const [listener, setListener] = useState({
    list: [() => {}],
    usable: () => {},
  });
  const [templates, setTemplates] = useState({
    ...DEFAULT_TRANSITIONS,
    ...initialTransition
  });
  const [render, setRender] = useState(null);
  const [active, setActive] = useState(null);
  const [to, setTo] = useState(null);
  // console.log({initialTransition, initialPage, ...params});

  const initialize = (initialEl) => {
    updateActivePage(initialEl);
    setInitialized(true);
  };

  const addTemplate = (newTemplates) => {};

  const updateActivePage = (newActive) => {
    setActive(newActive);
    setRender([newActive]);
  };

  useEffect(() => {
    if (to) {
      const { toElement, outStyle, outParams, transitionIn } = to;
      const onEnd = () => {
        setTo(null);
        updateActivePage(toElement);
      };
      if (!templates.hasOwnProperty(outStyle)) return;
      setRender([
        React.cloneElement(active, {
          key: active.key,
          ...templates[outStyle],
        }),
        React.cloneElement(toElement, {
          key: toElement.key,
          transition: transitionIn,
          onAnimationEnd: onEnd,
        }),
      ]);
    }
  }, [to]);

  const toScreen = ({
    to: toElement,
    outStyle,
    transitionIn,
    outParams = null,
    ...settings
  }) => {
    setTo({ toElement, outStyle, outParams, transitionIn });
  };

  // const toScreen = useCallback(
  //   ({ to, outStyle, transitionIn, outParams = null }) => {
  //     const page = pageRef.current;
  //     console.log(pageRef.current);
  //     const onEnd = () => {
  //       () => updateActivePage(to);
  //     };

  //     if (page === undefined) {
  //       updateActivePage(to);
  //       setInitialized(true);
  //       return;
  //     }
  //     // console.log("page:", page);
  //     if (!templates.hasOwnProperty(outStyle)) return;
  //     page &&
  //       setRender([
  //         React.cloneElement(page, {
  //           key: page.key,
  //           ...templates[outStyle],
  //         }),
  //         React.cloneElement(to, {
  //           key: to.key,
  //           transition: transitionIn,
  //           onAnimationEnd: onEnd,
  //         }),
  //       ]);
  //   },
  //   [pageRef.current]
  // );

  const addListener = (newList) => {
    setListener({
      list: [...listener.list, newList],
      usable: () => {
        [...listener.list, newList].forEach((f) => f());
      },
    });
  };

  return {
    render: <>{render}</>,
    isInitialized: initialized,
    addListener,
    toScreen,
    initializeTransition: initialize,
  };
}
