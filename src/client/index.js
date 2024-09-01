import { checkForName } from "./js/nameChecker";
import { handleSubmit, onBlur } from "./js/formHandler";
import "./styles/main.scss";


// khi export ở đây để có thể sài hàm ở file html or js khác
// phần output Client in file webpack
export { checkForName, handleSubmit, onBlur };
