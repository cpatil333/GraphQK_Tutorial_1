import "./App.css";
import Login from "./components/Login";
import "materialize-css/dist/css/materialize.min.css";
import { routes } from "./routes";
import NavBar from "./components/NavBar";
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes);
  return (
    <div className="App">
      <NavBar />
      {element}
    </div>
  );  
}

export default App;
