import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ForcedGraphPage from "./pages/forcedGraph";
import DisjointPage from "./pages/disjointPage";
import MobilePatentSuitsPage from "./pages/mobilePatentSuitsPage";
import ForcedGraphCanvasPage from "./pages/forcedGraphCanvasPage";

const App = () => {
  return (
    <main className="content">
      {/* <Topbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/disjoint" element={<DisjointPage />} />
        <Route path="/forced-graph" element={<ForcedGraphPage />} />
        <Route
          path="/forced-graph-canvas"
          element={<ForcedGraphCanvasPage />}
        />
        <Route
          path="/mobile-patent-suits"
          element={<MobilePatentSuitsPage />}
        />
      </Routes>
    </main>
  );
};

export default App;
