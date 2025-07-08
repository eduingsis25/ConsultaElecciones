import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Censo } from "./pages/RegCenso";
import { Consulta } from "./pages/Consulta";
import { Voto } from "./pages/RegVoto";
import { Navigation } from "./components/navigations";
import { LoginPage } from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/regvoto" element={<Voto />} />
            <Route path="/censo" element={<Censo />} />
          </Route>
          <Route path="/consulta" element={<Consulta />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
