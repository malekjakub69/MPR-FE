import "bootstrap/dist/css/bootstrap.min.css";
import { FC, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { IcoDelete } from "../../../assets/icons";
import { AppRoles, IUser } from "../../../types";
import "./ProjectTeam.css";

interface IProps {
    className?: string;
}

export const TeamUsersTable: FC<IProps> = () => {
    const [teamUsers, setTeamUsers] = useState<IUser[]>([]);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState(-1);
    const [selectedRole, setSelectedRole] = useState<AppRoles>(AppRoles.NONE);

    //TODO get teamUsers from backend (that are bounded onto this project) and store them into users state + add Loader component while fetching data which will be displayed
    // Roles of users in this component should be Manager, Employee, External
    // TODO get allUsers from BE (those are all users -> for adding them to project)
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
        setTeamUsers(tmp);
        setAllUsers(tmp);
    }, []);

    // TODO -> after deleting user not only state is changed for displaying users but also DELETE request on BE must be done
    const deleteUser = (index: number, userId: number) => {
        // this is just updating state so user is not displayed anymore
        setTeamUsers((teamUsers) => teamUsers.filter((s, i) => i !== index));
        // TODO add communication with BE that deletes user from project
    };

    // TODO this is just for demo on FE how it should work (it needs to be refactored (depending on Types) differences in roles)ň
    // selected user indicates index in allUsers array state
    const addUser = () => {
        if (selectedUser !== -1) {
            // creating newUser from allusers state
            let newUser = {
                pk: allUsers[selectedUser].pk,
                fields: {
                    name: allUsers[selectedUser].fields.name,
                    surname: allUsers[selectedUser].fields.surname,
                    role: selectedRole,
                    email: allUsers[selectedUser].fields.email,
                },
            };
            let tmpArr = [...teamUsers];
            tmpArr.push(newUser);
            setTeamUsers(tmpArr);
        }
        // TODO create User with role assigned to project on BE
    };

    return (
        <div>
            <Table striped bordered className="myTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jméno</th>
                        <th>Příjmení</th>
                        <th>Role</th>
                        <th>Vymazat</th>
                    </tr>
                </thead>
                <tbody>
                    {teamUsers.map((teamUser, index) => {
                        return (
                            <tr key={index}>
                                <td>{teamUser.pk}</td>
                                <td>{teamUser.fields.name}</td>
                                <td>{teamUser.fields.surname}</td>
                                {/* TODO: změnit role  */}
                                {teamUser.fields.role === AppRoles.PROJECT_MANAGER ? (
                                    <td>Manažér</td>
                                ) : teamUser.fields.role === AppRoles.USER ? (
                                    <td>Zamestnanec</td>
                                ) : (
                                    <td>Externý uživatel</td>
                                )}
                                <td>
                                    <IcoDelete
                                        className="ml-4 cursor-pointer  mx-auto mt-1"
                                        width={"30px"}
                                        fill="red"
                                        onClick={() => deleteUser(index, teamUser.pk)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div>
                <h3>Přidat člena do tímu</h3>
                <Form.Select
                    aria-label="Default select example"
                    className="customSelect"
                    onChange={(e) => setSelectedUser(e.target.value as unknown as number)}
                    value={selectedUser}
                >
                    <option value={-1}>Vyberte uživatele</option>
                    {allUsers.map((user, index) => {
                        return (
                            <option key={index} value={index}>
                                {user.fields.name} {user.fields.surname}
                            </option>
                        );
                    })}
                </Form.Select>
                <Form.Select
                    aria-label="Default select example"
                    className="customSelect"
                    onChange={(e) => setSelectedRole(e.target.value as unknown as AppRoles)}
                    value={selectedRole}
                >
                    {/* TODO: změnit role  */}
                    <option value={AppRoles.PROJECT_MANAGER}>Manažér</option>
                    <option value={AppRoles.USER}>Zamestnanec</option>
                    <option value={AppRoles.ADMIN}>Externý uživatel</option>
                </Form.Select>
                <Button onClick={addUser}>Přidat</Button>
            </div>
        </div>
    );
};
