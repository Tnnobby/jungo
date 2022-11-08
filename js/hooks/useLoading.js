import { useDispatch } from "react-redux";
import { setLoadingOverlayState } from "../../redux/reducers/overlayReducer";

export default function useLoading () {
  const dispatch = useDispatch();

  const openLoading = () => {
    dispatch(setLoadingOverlayState('open_loading'))
  }
  const closeLoading = () => {
    dispatch(setLoadingOverlayState('close_loading'))
  }

  return {
    open: openLoading,
    close: closeLoading
  }
}