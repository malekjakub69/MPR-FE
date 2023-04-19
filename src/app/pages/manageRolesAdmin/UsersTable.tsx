import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { AppRoles, IUser } from "../../../types";
import "./ManageRolesAdmin.css";

interface IProps {
    className?: string;
}

export const UsersTable: FC<IProps> = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    //TODO get users from backend and store them into users state + add Loader component while fetching data which will be displayed
    useEffect(() => {
        // just for testing
        let tmp = [
            {
                pk: 1,
                model: "any",
                fields: {
                    password: "hash",
                    name: "John",
                    surname: "Doe",
                    email: "...",
                    role: AppRoles.ADMIN,
                    last_login: "2021-10-10T10:10:10.000Z",
                },
            },
        ];
        setUsers(tmp);
    }, []);

    // TODO -> after changing role not only state is changed for displaying new role but also PUT request on BE must be done
    const changeRole = (index: number, event: ChangeEvent<HTMLInputElement>, userId: number) => {
        // changing state for rerendering
        const newRole = event.target.value as unknown as AppRoles;
        let tmpArr = [...users];
        tmpArr[index].fields.role = newRole;
        setUsers(tmpArr);

        // TODO make PUT request that changed users role based on his userID to his new role "newRole" on backend
    };

    return (
        <Table striped bordered hover className="myTable">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Jméno</th>
                    <th>Příjmení</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return (
                        <tr>
                            <td>{user.pk}</td>
                            <td>{user.fields.name}</td>
                            <td>{user.fields.surname}</td>
                            <td>
                                <RadioGroup row className="radio" value={user.fields.role} onChange={(e) => changeRole(index, e, user.pk)}>
                                    <FormControlLabel value={AppRoles.ADMIN} control={<Radio />} label="Administrátor" />
                                    <FormControlLabel value={AppRoles.PROJECT_MANAGER} control={<Radio />} label="Projektový manažér" />
                                    <FormControlLabel value={AppRoles.USER} control={<Radio />} label="Uživatel" />
                                </RadioGroup>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
