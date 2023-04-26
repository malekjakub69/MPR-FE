import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import toast from "react-hot-toast";
import { RiskApi, UserApi } from "../../../api";
import "../projectDetial/ProjectDetail.css";

interface IProps {
    className?: string;
}

export const Risks: FC<IProps> = () => {
    const { data: risks, isLoading } = useQuery({
        queryKey: ["risks"],
        queryFn: () => RiskApi.getAll(),
        onError: () => {
            toast.error("Při načítání rizik došlo k chybě");
        },
    });

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () => UserApi.getAll(),
        onError: () => {
            toast.error("Něco se pokazilo při načítání uživatelů");
        },
    });

    return (
        <div className="projectTeam ">
            <h1>Seznam rizik</h1>
            {risks &&
                userData &&
                !isLoading &&
                risks.map((risk) => (
                    <div key={risk.pk} className="project-detail-risk relative border-mine-shaft-200 border-2">
                        <h1>{risk.fields.title}</h1>
                        <div className="project-detail-risk-row">
                            <div className="project-detail-risk-column">
                                <h3>Vytvoril</h3>
                                {userData.map((user) => {
                                    if (user.pk == risk.fields.owner) {
                                        return (
                                            <p>
                                                {user.fields.name} {user.fields.surname}
                                            </p>
                                        );
                                    }
                                })}
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
                    </div>
                ))}
        </div>
    );
};
