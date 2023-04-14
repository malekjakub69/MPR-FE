import { Field, Formik, FieldArray, FieldArrayRenderProps } from "formik";
import { FC, useState  } from "react";
import { array, object, string } from "yup";
import { CreateProjectInputFormik } from "../../components/CreateProjectInput";
import "./CreateProject.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from "@mui/material";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface IProps {
    className?: string;
}


export const CreateProjectForm: FC<IProps> = () => {
    const [category, setCategory] = useState("")
    const initialValues = {
        name: "",
        description: "",
        toggle: false,
        startDate: new Date(),
        endDate: new Date(Date.now() + ( 3600 * 1000 * 24)),
        categories: []
    };

    const loginFormValidationSchema = object().shape({
        name: string().required("Toto pole je povinné"),
        description: string().required("Toto pole je povinné"),
        categories: array().min(1, 'Minimum of 1 friends'),
    });


    // TODO -> functionality of button after creating new project (submitting form), change any to specific type
    const createProject = (values: any) => {
        console.log("Creating project!", values);
    }

    const addCategory = (array: FieldArrayRenderProps) => {
        if(category !== "") {
            array.push(category)
            setCategory("")
        }
    }

    return (
        <Formik onSubmit={createProject} validationSchema={loginFormValidationSchema} initialValues={initialValues}>
            {({ handleSubmit, handleChange, values, setFieldValue, errors }) => (
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
                                selected={values.startDate}
                                onChange={(val) => {setFieldValue("startDate", val)}}
                            />
                        </div>
                        <div className="column">
                            <div>Konec projektu:</div>
                            <DatePicker
                                className="calendar"
                                selected={values.endDate}
                                onChange={(val) => {setFieldValue("endDate", val)}}
                            />
                        </div>
                    </div>
                    <div className="scales">
                        Zmenšený rozsah škál: 
                        <FormControlLabel control={<Checkbox checked={values.toggle} />}
                            label=""
                            name="toggle"
                            onChange={handleChange}
                            className="check"
                        />
                    </div>
                    <FieldArray 
                        name="categories"
                        render={arrayHelpers => (
                            <div>
                                <div className="risks">
                                    Kategorie rizík:
                                    <br />
                                    {
                                        values.categories.map((category, index) => {
                                            return(
                                                <div className="risk" key={index}>
                                                    {category}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="categoryInput">
                                    <input className="border-2 text-sm focus:outline-none disabled:bg-transparent rounded-md p-2 disabled:opacity-100 text-gray-700 disabled:text-gray-600 focus:border-b-[#323e99]"
                                    placeholder="Kategorie" value={category} onChange={(e) => {setCategory(e.target.value)}}>
                                    </input>
                                    <button type="button" onClick={() => addCategory(arrayHelpers)}>
                                        Přidat kategorii
                                    </button>
                                </div>
                                {errors.categories !== "" && <div className="errorMessage">{errors.categories}</div>}
                            </div>
                        )}
                    />
                    <button type="submit">
                        Vytvořit projekt
                    </button>
                </form>
            )}
        </Formik>
    );
};
