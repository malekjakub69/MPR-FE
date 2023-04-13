import { Formik } from "formik";
import { FC, useState  } from "react";
import { object, string } from "yup";
import { CreateProjectInputFormik } from "../../components/CreateProjectInput";
import "./CreateProject.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface IProps {
    className?: string;
}


export const CreateProjectForm: FC<IProps> = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [checkedState, setCheckedState] = useState(false)
    const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now() + ( 3600 * 1000 * 24)));
    const initialValues = {
        name: "",
        description: "",
    };

    const loginFormValidationSchema = object().shape({
        name: string().required("Toto pole je povinné"),
        description: string().required("Toto pole je povinné"),
    });

    // TODO -> functionality of button after creating new project (submitting form)
    const createProject = () => {
        console.log("Creating project!");
    }

    return (
        <Formik onSubmit={createProject} validationSchema={loginFormValidationSchema} initialValues={initialValues}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <CreateProjectInputFormik
                        className="my-6 text-#1d3746 w-100"
                        label="Název projektu"
                        name={"name"}
                        type={"text"}
                        placeholder={"Názov"}
                        required
                    />
                    <CreateProjectInputFormik
                        className="my-6 text-#1d3746 w-100"
                        label="Popis projektu"
                        name={"description"}
                        type={"text"}
                        placeholder={"Popis"}
                        required
                    />

                    <div className="row">
                        <div className="column">
                            <div>Začátek projektu:</div>
                            <DatePicker
                                className="calendar"
                                selected={startDate}
                                onChange={date => date && setStartDate(date)}
                            />
                        </div>
                        <div className="column">
                            <div>Konec projektu:</div>
                            <DatePicker
                                className="calendar"
                                selected={endDate}
                                onChange={date => date && setEndDate(date)}
                            />
                        </div>
                    </div>
                    <div className="scales">
                        Zmenšený rozsah škál: <Checkbox {...label} className="check" checked={checkedState} onChange={() => setCheckedState(!checkedState)}/>
                    </div>
                    <button type="submit">
                        Vytvořit projekt
                    </button>
                </form>
            )}
        </Formik>
    );
};
