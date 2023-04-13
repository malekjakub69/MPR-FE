import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { FC, useEffect } from "react";
import { IcoLoader } from "../assets/icons";
import "./App.css";
import { NotificationCenter } from "./components/NotificationCenter";
import { useAuth } from "./context/AuthContext";
import { Dashboard, Login, MainLayout, ProjectDetail, CreateProject, CreateRisk } from "./pages";

const PrivatePlantRoute: FC = () => {
    const { authenticate, authState } = useAuth();

    useEffect(() => {
        if (authState !== "idle") return;
        authenticate();
    }, [authenticate, authState]);

    if (authState === "fail") return <Navigate to="/login" />;
    if (authState === "inProgress") return <IcoLoader className={"m-auto animate-spin w-10 fill-gray-500"} />;

    return <MainLayout />;
};

// TODO -> route createproject should be visible only for project manager (admin ?) not for regular customer ... need to be done
export default function App() {
    return (
        <div className="App">
            <NotificationCenter />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PrivatePlantRoute />}>
                        <Route path="project/:projectId" element={<ProjectDetail />} />
                        <Route path="*" element={<Dashboard />} />
                        <Route path="createproject" element={<CreateProject />} />
                        <Route path="createrisk" element={<CreateRisk />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}
