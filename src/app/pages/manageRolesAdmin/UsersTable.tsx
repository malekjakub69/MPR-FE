import { FC, useState, useEffect, ChangeEvent } from "react";
import "./ManageRolesAdmin.css"
import { IUser, AppRoles } from "../../../types";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';

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
                "name": "Peter",
                "surname": "Parker",
                "email": "...",
                "id": 545,
                "role":0,
            },
            {
                "name": "Scarlet",
                "surname": "Johanson",
                "email": "...",
                "id": 847,
                "role":1
            }
        ]
        setUsers(tmp)
    }, []);

    // TODO -> after changing role not only state is changed for displaying new role but also PUT request on BE must be done
    const changeRole = (index: number, event: ChangeEvent<HTMLInputElement>, userId: number) => {
        // changing state for rerendering
        const newRole = event.target.value as unknown as AppRoles
        let tmpArr = [...users]
        tmpArr[index].role = newRole
        setUsers(tmpArr)
        
        // TODO make PUT request that changed users role based on his userID to his new role "newRole" on backend
    }

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
                {
                    users.map((user, index) => {
                        return(
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>
                                <RadioGroup
                                    row
                                    className='radio'
                                    value={user.role}
                                    onChange={(e) => changeRole(index, e, user.id)}
                                >
                                    <FormControlLabel value={AppRoles.ADMIN} control={<Radio />} label="Administrátor" />
                                    <FormControlLabel value={AppRoles.PROJECT_MANAGER} control={<Radio />} label="Projektový manažér" />
                                    <FormControlLabel value={AppRoles.USER} control={<Radio />} label="Uživatel" />
                                </RadioGroup>
                                </td>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </Table>
    )
};
