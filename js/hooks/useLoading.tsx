import { useContext } from "react";
import { LoadingContext } from "../components/Loading/LoadingHandler";

export default function useLoading () {
  const loading = useContext(LoadingContext)

  return loading;
}