import { FC } from "react";
import "./ProjectDetail.css"

interface IProps {
    className?: string;
}

// TODO -> if Project role == MANAGER then he should be able to change status of the risk -> need to be done (add button to change status maybe next to risk name)
// TODO -> this is just layout for one risk -> there should be .map function that maps over all risks and displays them
// didnt create types yet
export const ShowRisks: FC<IProps> = () => {
    return (
        <div className="project-detail-risk">
            <h1>Názov rizika</h1>
            <div className="project-detail-risk-row">
                <div className="project-detail-risk-column">
                    <h3>Vytvoril</h3>
                    <p>Peter Parker</p>
                </div>
                <div className="project-detail-risk-column">
                    <h3>Pravdepodobnost</h3>
                    <p>Malá</p>
                </div>
                <hr/>
                <div className="project-detail-risk-column">
                    <h3>Dopad</h3>
                    <p>Kritický</p>
                </div>
                <div className="project-detail-risk-column">
                    <h3>Status</h3>
                    <p>Koncept</p>
                </div>
            </div>
            <p><b>Popis:</b> Praesent dapibus. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Proin mattis lacinia justo. Aenean placerat.</p>
            <hr/>
            <p><b>Nebezpečenstvo:</b> Praesent dapibus. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem.</p>
            <hr/>
            <p><b>Spúštač:</b> Praesent dapibus. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem.</p>
            <hr/>
            <p><b>Reakcia:</b> Praesent dapibus. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem.</p>
        </div>
    )
};
