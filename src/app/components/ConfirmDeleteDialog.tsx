import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { IcoOrderMat } from "../../assets/icons";
import { KanbanDialog } from "./KanbanDialog";

interface IProps {
    onClose: () => void;
    onYes: () => void;
    open: boolean;
    name: string;
    type: string;
}

export const ConfirmDeleteDialog: FC<IProps> = ({ onClose, open, name, onYes, type }) => {
    const queryClient = useQueryClient();

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <KanbanDialog className="min-w-[60vw] max-w-[80vw] min-h-[25vh] max-h-[40vh]" closeDialog={() => onClose()} isOpen={open}>
                <KanbanDialog.Header>
                    <KanbanDialog.Title className={"uppercase"}>Smazat projekt</KanbanDialog.Title>
                    <KanbanDialog.Subtitle>{name}</KanbanDialog.Subtitle>
                </KanbanDialog.Header>
                <KanbanDialog.Content className="flex grow justify-around gap-4">
                    <IcoOrderMat className="fill-[#A2A2AD] basis-40 pb-10" />
                    <div className={"basis-1/2 my-auto "}>
                        <div className={"flex flex-col justify-between"}>
                            <div className={"text-center pb-10 text-3xl text-gray-500"}>
                                Opravdu chceš smazat {type} <span className={"text-black"}>{name}</span>
                            </div>
                            <button className="bg-black uppercase h-14 text-2xl w-full text-white rounded-md" onClick={() => onYes()}>
                                Ano
                            </button>
                        </div>
                    </div>
                </KanbanDialog.Content>
            </KanbanDialog>
        </div>
    );
};
