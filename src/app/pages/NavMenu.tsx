import { FC } from "react";

interface IProps {
    className?: string;
}

const logo = require("./../../assets/images/logo.png");

export const NavMenu: FC<IProps> = (className) => {
    return (
        <div className={`flex flex-col items-stretch nav-menu-grad overflow-auto relative ${className || ""}`}>
            <div className={`bg-mine-shaft h-32 w-full flex justify-center align-center shrink-0 sticky top-0 z-10`}>
                <img src={logo} className={"w-4/6 object-contain"} alt={"logo"} />
            </div>
            <div className="bg-mine-shaft-400 h-full text-white p-4">Any menu items</div>
        </div>
    );
};
