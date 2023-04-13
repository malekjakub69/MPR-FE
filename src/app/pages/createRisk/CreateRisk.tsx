import { FC } from "react";
import "./CreateRisk.css"
import { CreateRiskForm } from "./CreateRiskForm";

interface IProps {
    className?: string;
}

export const CreateRisk: FC<IProps> = () => {
    return (
        <div className="createRisk">
            <h1>Vytvořit riziko</h1>
            <CreateRiskForm />
        </div>
    )
};
