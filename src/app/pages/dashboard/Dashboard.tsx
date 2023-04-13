import { FC, useEffect, useState } from "react";
import "./Dashboard.css";
import { DashboardProjects } from "./DashboardProjects";

interface IProps {
    className?: string;
}


export const Dashboard: FC<IProps> = () => {
    const [projects, setProjects] = useState([])

    //TODO get projects from backend and store them into projects state and send as props into DashboardProjects component
    useEffect(() => {

    }, []);

    return (
        <div className="dashboard">
            <h1>Projekty</h1>
            <DashboardProjects />
        </div>
    )
};
