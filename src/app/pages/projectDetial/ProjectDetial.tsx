import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectApi } from "../../../api";
import { IProject } from "../../../types";
import "./ProjectDetail.css";
import { ShowRisks } from "./ShowRisks";
import { Matrix3x3 } from "./Matrix3x3";

interface IProps {
    className?: string;
}

// TODO -> this subpage will be enetered through navigate from dashboard page so information about this project should be passed within navigate function
// with risks as well that are part of this project
// TODO risks from this particular project will be pass as props into ShowRisk component that displays every single risk (to be done)
// TODO -> if app role == project manager then there has to be button for adding people into project (maybe somewhere near the Project name) (navigate to /projectteam)
export const ProjectDetail: FC<IProps> = () => {
    let { projectId } = useParams();
    const navigate = useNavigate();

    const { data: project, isLoading } = useQuery({
        queryKey: ["project", projectId],
        queryFn: () => (projectId ? ProjectApi.getOne(projectId) : ({} as IProject)),
        onError: () => {
            toast.error("Something went wrong while loading project");
        },
    });

    return (
        <div className="project-detail">
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <>
                    <h1>{project?.fields?.name}</h1>
                    <ShowRisks />
                    <div className="flex mt-4">
                        <button onClick={() => navigate("createrisk")} className="basis-full bg-mine-shaft-50 text-white text-xl my-2 mx-10 rounded-lg h-14">
                            Create new risk
                        </button>
                    </div>
                    {
                        project?.fields?.scale_risk == true ?
                        <Matrix3x3 /> :
                        <div>false</div>
                    }
                </>
            )}
        </div>
    );
};
