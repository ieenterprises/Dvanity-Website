import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AdminIndex from "./pages/admin/index";
import AdminDashboard from "./pages/admin/dashboard";
import AdminSignup from "./pages/admin/signup";
import routes from "tempo-routes";
import { ThemeProvider } from "./context/ThemeContext";
import { ContentProvider } from "./context/ContentContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <Suspense fallback={<p>Loading...</p>}>
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminIndex />} />
                <Route path="/admin/signup" element={<AdminSignup />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {import.meta.env.VITE_TEMPO === "true" && (
                  <Route path="/tempobook/*" />
                )}
              </Routes>
              {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
            </>
          </Suspense>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
