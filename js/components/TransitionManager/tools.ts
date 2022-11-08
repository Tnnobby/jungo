import { Routes } from ".";
import { Overlay, Overlays } from "./type";

type RouteBuilder = (dict: any) => Routes;
type OverlayBuilder = (arg1: {bedsheets?: any, fullscreens?: any}) => Overlays;

const buildRoutes: RouteBuilder = (dict) => {
  const _k = Object.keys(dict);
  return _k.reduce((prev, curr, index) => {
    let _ret = prev;
    _ret[curr] = dict[curr];
    return _ret;
  }, {});
};

const buildOverlays: OverlayBuilder = ({bedsheets, fullscreens}) => {
  let overlays = [];

  if (bedsheets) {
    for (let sheet in bedsheets) {
      const _newSheet: Overlay = {
        content: bedsheets[sheet],
        type: 'bedsheet'
      }
      overlays.push(_newSheet)
    }
  }
  if (fullscreens) {
    for (let screen in fullscreens) {
      const _newScreen: Overlay = {
        type: 'fullscreen',
        content: fullscreens[screen]
      }
      console.log(screen)
    }
  }
  return [];
};

export { buildRoutes, buildOverlays };
