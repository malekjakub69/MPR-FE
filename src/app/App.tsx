import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { FC, useEffect } from "react";
import { IcoLoader } from "../assets/icons";
import "./App.css";
import { NotificationCenter } from "./components/NotificationCenter";
import { useAuth } from "./context/AuthContext";
import { Dashboard, Login, MainLayout, ProjectDetail, CreateProject } from "./pages";

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
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}
