import { Route, Routes } from "react-router-dom";
import { ConnectPage } from "./pages/ConnectPage";
import { HomePage } from "./pages/HomePage";
import { MePage } from "./pages/MePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ResumePage } from "./pages/ResumePage";
import { WorksPage } from "./pages/WorksPage";
import { SiteRoute } from "./types/site";

export default function App() {
  return (
    <Routes>
      <Route path={SiteRoute.Home} element={<HomePage />} />
      <Route path={SiteRoute.Me} element={<MePage />} />
      <Route path={SiteRoute.Works} element={<WorksPage />} />
      <Route path={SiteRoute.Resume} element={<ResumePage />} />
      <Route path={SiteRoute.Connect} element={<ConnectPage />} />
      <Route path="/works/:slug" element={<ProjectDetailPage />} />
      <Route path="/work/:slug" element={<ProjectDetailPage />} />
    </Routes>
  );
}
