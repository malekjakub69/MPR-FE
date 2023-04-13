import { FC, useEffect, useState } from "react";
import "./Dashboard.css";

interface IProps {
    className?: string;
}

export const DashboardProjects: FC<IProps> = ({}) => {
    // TODO -> this is just prepared CSS -> when Dashboard fetches json (array with project infos) -> it will be passed here and in return() will be .map function which will display info as below (lorem ipsum replaced)
    // TODO button onClick navigate to subpage with project info
    return (
        <div className="project">
            <div className="columnInfo">
                <h1>Názov projektu</h1>
                <p>Praesent dapibus. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Proin mattis lacinia justo. Aenean placerat. Pellentesque ipsum. Nunc auctor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Et harum quidem rerum facilis est et expedita distinctio. Duis risus. Etiam commodo dui eget wisi.</p>
            </div>
            <div className="columnStats">
                <h3>Štatistiky</h3>
                <p>Lorem Ipsum: 128</p>
                <p>Dolor sit alem: 67%</p>
                <p>Consequat: 19.08.2022</p>
                <p>Ac conge dui: 35%</p>
                <button>Do projektu</button>
            </div>
        </div>
    )
};
