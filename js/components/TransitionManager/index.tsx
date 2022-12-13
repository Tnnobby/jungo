import { useState, createContext, useContext, useEffect, cloneElement } from "react";
import { FirebaseContext } from "../../context-providers/FirebaseProvider";
import Bedsheet from "../Bedsheet.old";
import CameraOverlay from "../CameraOverlay";
import { ErrorHandler } from "../error-handler";
import Loading from "../Loading/loading";
import { TransitionBuilder } from "./transition";
import { OutTransitionSettings, Overlays } from "./type";

type ManagerGetter = (manager: Manager) => void;
type ChangeFunction = (arg1: {
  toElement?: JSX.Element;
  toRoute?: string;
  options?: OutTransitionSettings;
  resetStack?: boolean;
  data?: any;
}) => void;

type OverlayTypes = "bedsheet" | "fullpage";

export interface OverlayProps {
  onCancel?: (message?: any) => void;
  onClose?: (message?: any) => void;
  [key: string]: any;
}

export interface DispatchParams {
  overlayRoute?: string;
  type: OverlayTypes;
  overlayElement?: JSX.Element;
  onChange?: any;
  initialValue?: any;
  additionalProps?: OverlayProps;
}

type OverlayDispatch = (arg1: DispatchParams) => void;

interface Manager {
  to: ChangeFunction;
}
type Stack = JSX.Element[];

type Route = {
  name: string;
  route: JSX.Element;
};
type Routes = {};

interface NavigationFunctions {
  lastPage: () => void;
  toPage: ChangeFunction;
  dismissLoading: () => void;
  openLoading: () => void;
  openOverlay: OverlayDispatch;
  openCamera: (tools: any) => void;
}

const NavigationContext = createContext<NavigationFunctions>(null);

const TransitionManager = ({
  initial,
  manager,
  routes,
  overlays,
  initialData,
  ...props
}: {
  initial: string;
  manager: ManagerGetter;
  routes: Routes;
  overlays: Overlays;
  initialData: any;
}) => {
  const [stack, setStack] = useState<Stack>([
    cloneElement(routes[initial], { ...initialData }),
  ]);
  const [loading, setLoading] = useState<{ open: boolean; displayed: boolean }>(
    { open: false, displayed: false }
  );
  const [bedsheet, setBedsheet] = useState<{
    element: JSX.Element;
    props: any;
  }>({ element: null, props: {} });
  const [camera, setCamera] = useState<{ open: boolean; tools: any }>({
    open: false,
    tools: null,
  });
  const { user } = useContext(FirebaseContext)

  useEffect(() => {
    if (!user) {
      routes['login_splash']
    }
  }, [user])

  /* Actions */
  const openLoading = () => setLoading({ open: true, displayed: true });

  const dismissLoading = () => setLoading({ open: false, displayed: true });

  const toPage: ChangeFunction = (arg1: {
    toElement: JSX.Element;
    toRoute: string;
    options: OutTransitionSettings;
    resetStack: boolean;
    data: any;
  }) => {
    console.log(arg1);
    const { data, options, toElement, toRoute, resetStack } = arg1;
    setStack((prev: Stack) => {
      const settings = TransitionBuilder.getDefaultNext();

      const _stack = prev;
      const outEl = _stack.pop();
      let inEl: JSX.Element;
      if (toRoute) {
        inEl = cloneElement(routes[toRoute], {
          transitionOptions: settings.in,
          data,
          zIndex: 2,
        });
      } else if (toElement) {
        inEl = cloneElement(toElement, {
          transitionOptions: settings.in,
          data,
          zIndex: 2,
        });
      }
      return !resetStack
        ? [
            ..._stack,
            cloneElement(outEl, {
              transitionOptions: settings.out,
              ...options,
            }),
            inEl,
          ]
        : [
            cloneElement(outEl, {
              transitionOptions: settings.out,
              _onTransitionEnd: () =>
                setStack((st) => {
                  const old = st.pop();
                  st.pop();
                  return [old];
                }),
            }),
            inEl,
          ];
    });
  };

  const lastPage = () => {
    console.log("last page called");
    setStack((prev: Stack) => {
      const settings = TransitionBuilder.getDefaultBack();
      const _p = prev;
      const oldEl = _p.pop();
      const newEl = _p.pop();
      return [
        ..._p,
        cloneElement(oldEl, {
          transitionOptions: settings.out,
          _onTransitionEnd: () =>
            setStack((st) => {
              const old = st.pop();
              st.pop();
              return [...st, old];
            }),
        }),
        cloneElement(newEl, {
          transitionOptions: settings.in,
          zIndex: 2,
        }),
      ];
    });
  };

  const openOverlay: OverlayDispatch = ({
    type,
    overlayRoute,
    overlayElement,
    onChange,
    initialValue,
    additionalProps,
  }) => {
    if (type === "bedsheet") {
      if (overlayRoute) {
        setBedsheet({
          element: cloneElement(overlays[overlayRoute], {
            onChange,
            initialValue,
          }),
          props: additionalProps || {},
        });
      } else if (overlayElement) {
        setBedsheet({
          element: cloneElement(overlayElement, {
            onChange,
            initialValue,
          }),
          props: additionalProps || {},
        });
      }
    }
  };

  /* Render Function */
  const renderStack = () => {
    let keys = {};
    
    return stack.map((el, index) => {
      if (keys.hasOwnProperty(el.type.name)) {
        keys[el.type.name] = 0;
        return cloneElement(el, {
          key: `${el.type.name}_${keys[el.type.name]}`,
        });
      } else {
        keys[el.type.name] += 1;
        return cloneElement(el, {
          key: `${el.type.name}_${keys[el.type.name]}`,
        });
      }
    });
  };

  const openCamera = (tools: any) => {
    setCamera({
      tools,
      open: true,
    });
  };

  return (
    <NavigationContext.Provider
      value={{
        lastPage,
        toPage,
        dismissLoading,
        openLoading,
        openOverlay,
        openCamera,
      }}
    >
      <ErrorHandler>
        {renderStack()}
        {bedsheet.element && (
          <Bedsheet
            _onClose={() =>
              setBedsheet({
                element: null,
                props: null,
              })
            }
            {...bedsheet.props}
          >
            {bedsheet.element}
          </Bedsheet>
        )}
        {camera.open && (
          <CameraOverlay
            close={() => {
              camera.tools.onClose && camera.tools.onClose()
              setCamera({ ...camera, open: false });
              
            }}
            {...camera.tools}
          />
        )}
        {loading.displayed && (
          <Loading
            open={loading.open}
            onClose={() => setLoading({ open: false, displayed: false })}
          />
        )}
      </ErrorHandler>
    </NavigationContext.Provider>
  );
};

export { NavigationContext, TransitionManager, Routes };
