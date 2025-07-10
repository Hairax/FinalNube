import "./index.css";

import { app, analytics } from "./firebase/Firebase";
import { AppRoutes } from "./routes/Route"; // Importa tus rutas

export function App() {
  console.log("Firebase App Initialized:", app);
  console.log("Firebase Analytics Initialized:", analytics);

  return <AppRoutes />;
}

export default App;
