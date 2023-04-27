import { FC } from "react";
import { TeamUsersTable } from "./TeamUsersTable";

interface IProps {
    className?: string;
}

export const ProjectTeam: FC<IProps> = () => {
    return (
        <div className="projectTeam rounded-xl">
            <h1>Lidé na projektu</h1>
            <TeamUsersTable />
        </div>
    );
};
