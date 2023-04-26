import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ProjectApi } from "../../../api";
import { IRisk } from "../../../types";
import "./ProjectDetail.css";
import { UserApi } from "../../../api";

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
        onSuccess: (data) => {console.log(data)}
    });

    const { data: users, isLoading: loading } = useQuery({
        queryKey: ["users"],
        queryFn: () => (UserApi.getAll()),
        onError: () => {
            toast.error("Something went wrong while loading project risks");
        },
        onSuccess: (users) => {console.log(users)}
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const generateRisk = (risk: IRisk) => {
        return (
            <div key={risk.pk} className="project-detail-risk">
                <h1>{risk.fields.name}</h1>
                <div className="project-detail-risk-row">
                    <div className="project-detail-risk-column">
                        <h3>Vytvoril</h3>
                        {
                            users?.map(user =>{
                                if(user.pk == risk.fields.owner){
                                    return(<p>{user.fields.name} {user.fields.surname}</p>)
                                } else {
                                    return <p></p>
                                }
                                
                            })
                        }
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
                    <b>Reakcia:</b> {risk.fields.reactions}
                </p>
            </div>
        );
    };

    return <>{data?.map((risk) => generateRisk(risk))}</>;
};
