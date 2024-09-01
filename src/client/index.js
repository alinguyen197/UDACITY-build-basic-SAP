// To run js, import all functions to bundle into 1 js file to use.
import { checkForName } from "./js/nameChecker";
import { handleSubmit, onBlur } from "./js/formHandler";
import "./styles/main.scss";
import { handleSearch } from "./js/app";
import loading from "./images/loading.svg";

// The output here can be used in html and js files.
// package.json output Client in file webpack
export { checkForName, handleSubmit, onBlur };
