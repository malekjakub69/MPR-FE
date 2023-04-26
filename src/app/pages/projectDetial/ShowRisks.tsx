import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ProjectApi } from "../../../api";
import { IcoDelete } from "../../../assets/icons";
import { IRisk } from "../../../types";
import { ConfirmDeleteDialog } from "../../components/ConfirmDeleteDialog";
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

    console.log(data);

    return (
        <>
            {data?.map((risk) => (
                <Risk key={risk.pk} risk={risk} />
            ))}
        </>
    );
};

interface IPropsRisk {
    className?: string;
    risk: IRisk;
}

const Risk: FC<IPropsRisk> = ({ risk }) => {
    const [deleteDialog, setDeleteDialog] = useState(false);
    let { projectId } = useParams();
    const queryClient = useQueryClient();

    const { mutate: deleteProject } = useMutation({
        mutationFn: (pk: number) => {
            return ProjectApi.deleteProjectRisk(pk);
        },
        onSuccess: (resp) => {
            toast.success("Riziko bylo úspěšně smazáno");
            setDeleteDialog(false);
            queryClient.resetQueries(["project_risk", projectId]);
        },
        onError: () => {
            toast.error("Smazání rizika selhalo");
        },
    });

    const confirmDeleteProject = () => {
        setDeleteDialog(true);
    };

    return (
        <div key={risk.pk} className="project-detail-risk relative">
            <h1>{risk.fields.title}</h1>
            <IcoDelete className="ml-4 cursor-pointer absolute top-4 right-4" width={"25px"} fill="red" onClick={() => confirmDeleteProject()} />
            <div className="project-detail-risk-row">
                <div className="project-detail-risk-column">
                    <h3>Vytvoril</h3>
                    <p>{risk.fields.title}</p>
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
                <b>Reakcia:</b> {risk.fields.reactions}
            </p>
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

            <ConfirmDeleteDialog
                open={deleteDialog}
                name={risk.fields.title}
                type="riziko"
                onClose={() => setDeleteDialog(false)}
                onYes={() => deleteProject(risk.pk)}
            />
        </div>
    );
};
