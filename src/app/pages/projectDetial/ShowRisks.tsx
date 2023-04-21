import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ProjectApi } from "../../../api";
import { IRisk } from "../../../types";
import "./ProjectDetail.css";

interface IProps {
    className?: string;
}

// TODO -> if Project role == MANAGER then he should be able to change status of the risk -> need to be done (add button to change status maybe next to risk name)
// TODO -> if project role == EMPLOYEE there should be button for adding new risk which will navigate user to /createrisk page
// TODO -> this is just layout for one risk -> there should be .map function that maps over all risks and displays them
// didnt create types yet
export const ShowRisks: FC<IProps> = () => {
    let { projectId } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["project_risk", projectId],
        queryFn: () => (projectId ? ProjectApi.getProjectRisk(projectId) : []),
        onError: () => {
            toast.error("Something went wrong while loading project risks");
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const generateRisk = (risk: IRisk) => {
        return (
            <div key={risk.pk} className="project-detail-risk">
                <h1>{risk.fields.name}</h1>
                <div className="project-detail-risk-row">
                    <div className="project-detail-risk-column">
                        <h3>Vytvoril</h3>
                        <p> {risk.fields.name}</p>
                    </div>
                    <div className="project-detail-risk-column">
                        <h3>Pravdepodobnost</h3>
                        <p> {risk.fields.probability}</p>
                    </div>
                    <hr />
                    <div className="project-detail-risk-column">
                        <h3>Dopad</h3>
                        <p>{risk.fields.impact}</p>
                    </div>
                    <div className="project-detail-risk-column">
                        <h3>Status</h3>
                        <p>{risk.fields.status}</p>
                    </div>
                </div>
                <p>
                    <b>Popis:</b> {risk.fields.description}
                </p>
                <hr />
                <p>
                    <b>Nebezpečenstvo:</b> {risk.fields.danger}
                </p>
                <hr />
                <p>
                    <b>Spúštač:</b> {risk.fields.trigger}
                </p>
                <hr />
                <p>
                    <b>Reakcia:</b> {risk.fields.reaction}
                </p>
            </div>
        );
    };

    return <>{data?.map((risk) => generateRisk(risk))}</>;
};
