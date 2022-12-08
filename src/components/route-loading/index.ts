import { useContext } from "react";
import { LoadingContext, LoadingGetterContext } from "./LoadingContext";

export { default as Route } from "./Route";
export { default as Routes } from "./Routes";

const useLoadingContext = () => useContext(LoadingContext);
export { useLoadingContext, LoadingContext, LoadingGetterContext };
