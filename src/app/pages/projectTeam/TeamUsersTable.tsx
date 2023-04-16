import { FC, useState, useEffect } from "react";
import "./ProjectTeam.css"
import { IUser } from "../../../types";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface IProps {
    className?: string;
}

export const TeamUsersTable: FC<IProps> = () => {
    const [teamUsers, setTeamUsers] = useState<IUser[]>([]);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState(-1);
    const [selectedRole, setSelectedRole] = useState(0);

    //TODO get teamUsers from backend (that are bounded onto this project) and store them into users state + add Loader component while fetching data which will be displayed
    // Roles of users in this component should be Manager, Employee, External
    // TODO get allUsers from BE (those are all users -> for adding them to project)
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
        setTeamUsers(tmp)
        setAllUsers(tmp)
    }, []);

    // TODO -> after deleting user not only state is changed for displaying users but also DELETE request on BE must be done
    const deleteUser = (index: number, userId: number) => {
        // this is just updating state so user is not displayed anymore
        setTeamUsers(teamUsers=> teamUsers.filter((s,i)=>(i !== index)))
        // TODO add communication with BE that deletes user from project
    }

    // TODO this is just for demo on FE how it should work (it needs to be refactored (depending on Types) differences in roles)ň
    // selected user indicates index in allUsers array state
    const addUser = () => {
        if(selectedUser != -1)
        {   
            // creating newUser from allusers state
            let newUser = {
                "name": allUsers[selectedUser].name,
                "surname": allUsers[selectedUser].surname,
                "id": allUsers[selectedUser].id,
                "role": selectedRole,
                "email": allUsers[selectedUser].email,
            }
            let tmpArr = [...teamUsers]
            tmpArr.push(newUser);
            setTeamUsers(tmpArr)
        }
        // TODO create User with role assigned to project on BE
    }

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
                    {
                        teamUsers.map((teamUser, index) => {
                            return(
                                <tr key={index}>
                                    <td>{teamUser.id}</td>
                                    <td>{teamUser.name}</td>
                                    <td>{teamUser.surname}</td>
                                    {
                                        teamUser.role == 0 ?
                                        <td>Manažér</td> :
                                        teamUser.role == 1 ?
                                        <td>Zamestnanec</td> :
                                        <td>Externý uživatel</td> 
                                    }
                                    <td><Button className="customButton" variant="danger" onClick={() => deleteUser(index, teamUser.id)}>Odstranit</Button></td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </Table>
            <div>
                <h3>Přidat člena do tímu</h3>
                <Form.Select aria-label="Default select example" className="customSelect" onChange={(e) => setSelectedUser(e.target.value as unknown as number)} value={selectedUser}>
                    <option value={-1}>Vyberte uživatele</option>
                    {
                        allUsers.map((user, index) => {
                            return(
                                <option key={index} value={index}>{user.name} {user.surname}</option>
                            )
                        })
                    }
                </Form.Select>
                <Form.Select aria-label="Default select example" className="customSelect" onChange={(e) => setSelectedRole(e.target.value as unknown as number)} value={selectedRole}>
                    <option value={0}>Manažér</option>
                    <option value={1}>Zamestnanec</option>
                    <option value={2}>Externý uživatel</option>
                </Form.Select>
                <Button onClick={addUser}>Přidat</Button>
            </div>
        </div>
    )
};
