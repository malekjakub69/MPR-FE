import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ProjectApi } from "../../api";
import { IProject } from "../../types";
import { useAuth } from "../context/AuthContext";

interface IProps {
    className?: string;
}

const logo = require("./../../assets/images/logo.png");

export const NavMenu: FC<IProps> = (className) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<IProject[]>([]);

    const { isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: () => ProjectApi.getAll(),
        onSuccess: (data) => {
            const myProjects: IProject[] = [];
            data.forEach((project) => {
                if (project.fields.owner_id === auth.user?.pk) myProjects.push(project);
            });
            setProjects(myProjects);
        },
    });

    return (
        <div className={`flex flex-col items-stretch nav-menu-grad overflow-auto relative ${className || ""}`}>
            <div className={`bg-mine-shaft h-32 w-full flex justify-center align-center shrink-0 sticky top-0 z-10`}>
                <img onClick={() => navigate("/")} src={logo} className={"w-4/6 object-contain cursor-pointer"} alt={"logo"} />
            </div>
            <div className="bg-mine-shaft-400 h-full text-white p-4">
                My projects
                {isLoading && <p>Loading...</p>}
                {!isLoading && (
                    <ul>
                        {projects.map((project) => (
                            <li>
                                <NavLink to={"/project/" + project.pk}>{project.fields.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button className="bg-red h-12" onClick={() => auth.logOut()}>
                Log out
            </button>
        </div>
    );
};
