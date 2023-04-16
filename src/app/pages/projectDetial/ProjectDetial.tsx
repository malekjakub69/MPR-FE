import { FC } from "react";
import "./ProjectDetail.css"
import { ShowRisks } from "./ShowRisks";

interface IProps {
    className?: string;
}

// TODO -> this subpage will be enetered through navigate from dashboard page so information about this project should be passed within navigate function
// with risks as well that are part of this project 
// TODO risks from this particular project will be pass as props into ShowRisk component that displays every single risk (to be done)
// TODO -> if app role == project manager then there has to be button for adding people into project (maybe somewhere near the Project name) (navigate to /projectteam)
export const ProjectDetail: FC<IProps> = () => {
    return (
        <div className="project-detail">
            <h1>Názov projektu</h1>
            <ShowRisks />
        </div>
    )
};
