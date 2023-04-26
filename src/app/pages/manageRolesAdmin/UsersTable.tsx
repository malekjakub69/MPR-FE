import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import { FC, useState } from "react";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../../api";
import { IcoDelete } from "../../../assets/icons";
import { AppRoles, IUser } from "../../../types";
import { ConfirmDeleteDialog } from "../../components/ConfirmDeleteDialog";
import { useAuth } from "../../context/AuthContext";
import "./ManageRolesAdmin.css";

interface IProps {
    className?: string;
}

export const UsersTable: FC<IProps> = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const auth = useAuth();

    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deletedUser, setDeletedUser] = useState<IUser | undefined>(undefined);

    if (auth.user?.fields.role !== AppRoles.ADMIN) {
        navigate("/");
    }

    const { data: users, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () => UserApi.getAll(),
    });

    const { mutate: deleteUser } = useMutation({
        mutationFn: () => {
            return deletedUser ? UserApi.deleteUser(deletedUser.pk) : ({} as Promise<any>);
        },
        onSuccess: () => {
            toast.success("Uřivatel byl úspěšně smazán");
            setDeleteUserDialog(false);
            setDeletedUser(undefined);
            queryClient.resetQueries(["users"]);
        },
        onError: () => {
            toast.error("Smazání uřivatele selhalo");
        },
    });

    // const { mutate: changeRole } = useMutation({
    //     mutationFn: (user: IUser, newRole: string) => {
    //         return UserApi.update({ ...user, role: newRole });
    //     },
    //     onSuccess: () => {
    //         toast.success("Uřivatel byl úspěšně smazán");
    //         queryClient.resetQueries(["users"]);
    //     },
    //     onError: () => {
    //         toast.error("Smazání uřivatele selhalo");
    //     },
    // });

    const confirmDeleteUser = () => {
        deleteUser();
    };

    const showDeleteUserDialog = (user: IUser) => {
        setDeletedUser(user);
        setDeleteUserDialog(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!users) {
        return <div>Not Found</div>;
    }

    return (
        <>
            <Table striped bordered hover className="myTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jméno</th>
                        <th>Role</th>
                        <th>Smazat</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: IUser) => {
                        return (
                            <tr>
                                <td>{user.pk}</td>
                                <td>
                                    {user.fields.name} {user.fields.surname}
                                </td>
                                <td>
                                    <RadioGroup row className="radio" value={user.fields.role} onChange={() => {}}>
                                        <FormControlLabel value={AppRoles.ADMIN} control={<Radio />} label="Administrátor" />
                                        <FormControlLabel value={AppRoles.PROJECT_MANAGER} control={<Radio />} label="Projektový manažér" />
                                        <FormControlLabel value={AppRoles.USER} control={<Radio />} label="Uživatel" />
                                    </RadioGroup>
                                </td>
                                <td width={80}>
                                    <IcoDelete
                                        className="ml-4 cursor-pointer  mx-auto mt-1"
                                        width={"30px"}
                                        fill="red"
                                        onClick={() => showDeleteUserDialog(user)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <ConfirmDeleteDialog
                open={deleteUserDialog}
                name={deletedUser?.fields.name}
                type="uživatele"
                onClose={() => setDeleteUserDialog(false)}
                onYes={() => confirmDeleteUser()}
            />
        </>
    );
};
