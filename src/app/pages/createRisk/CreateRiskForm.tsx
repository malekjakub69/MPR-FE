import { Formik } from "formik";
import { FC, useState  } from "react";
import { object, string } from "yup";
import { CreateProjectInputFormik } from "../../components/CreateProjectInput";
import "./CreateRisk.css";
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

interface IProps {
    className?: string;
}


export const CreateRiskForm: FC<IProps> = () => {
    const [proability, setProbability] = useState("Malá")
    const [impact, setImpact] = useState("Malý")
    const [status, setStatus] = useState("Koncept")
    const initialValues = {
        name: "",
        description: "",
        danger: "",
        trigger: "",
        reaction: ""
    };

    const loginFormValidationSchema = object().shape({
        name: string().required("Toto pole je povinné"),
        description: string().required("Toto pole je povinné"),
        danger: string().required("Toto pole je povinné"),
        trigger: string().required("Toto pole je povinné"),
        reaction: string().required("Toto pole je povinné"),
    });

    // TODO -> functionality of button after creating new risk (submitting form)
    const createProject = () => {
        console.log("Creating Risk!");
    }
    // TODO -> in probability and impact radio boxes (if project is using reduced scales then other radio buttons must be disabled (TINY, EXTREME must be disabled)) add prop to FormControlLabel disabled={condition}
    return (
        <Formik onSubmit={createProject} validationSchema={loginFormValidationSchema} initialValues={initialValues}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <CreateProjectInputFormik
                        className="my-6 text-#1d3746 w-100"
                        label="Název rizika"
                        name={"name"}
                        type={"text"}
                        placeholder={"Názov"}
                        required
                    />
                    <CreateProjectInputFormik
                        className="my-6 text-#1d3746 w-100"
                        label="Popis rizika"
                        name={"description"}
                        type={"text"}
                        placeholder={"Popis"}
                        required
                    />
                    <CreateProjectInputFormik
                        className="my-6 text-#1d3746 w-100"
                        label="Nebezpečenství rizika"
                        name={"danger"}
                        type={"text"}
                        placeholder={"Nebezpečenství"}
                        required
                    />
                    <CreateProjectInputFormik
                        className="my-6 text-#1d3746 w-100"
                        label="Spušteč rizika"
                        name={"trigger"}
                        type={"text"}
                        placeholder={"Spušteč"}
                        required
                    />
                    <CreateProjectInputFormik
                        className="my-6 text-#1d3746 w-100"
                        label="Reakce rizika"
                        name={"reaction"}
                        type={"text"}
                        placeholder={"Reakce"}
                        required
                    />
                    <p>Pravdepodobnost rizika</p>
                    <RadioGroup
                        row
                        className='radio'
                        value={proability}
                        name="radio-buttons-group"
                        onChange={(e)=> setProbability(e.target.value)}   
                    >
                        <FormControlLabel value={"Nepatrná"} control={<Radio />} label="Nepatrná" />
                        <FormControlLabel value={"Malá"} control={<Radio />} label="Malá" />
                        <FormControlLabel value={"Střední"} control={<Radio />} label="Střední" />
                        <FormControlLabel value={"Velká"} control={<Radio />} label="Velká" />
                        <FormControlLabel value={"Mimořádne velká"} control={<Radio />} label="Mimořádne velká" />
                    </RadioGroup>
                    <p>Dopad rizika</p>
                    <RadioGroup
                        row
                        className='radio'
                        value={impact}
                        name="radio-buttons-group"
                        onChange={(e)=> setImpact(e.target.value)}   
                    >
                        <FormControlLabel value={"Nepatrný"} control={<Radio />} label="Nepatrný" />
                        <FormControlLabel value={"Malý"} control={<Radio />} label="Malý" />
                        <FormControlLabel value={"Cititelný"} control={<Radio />} label="Cititelný" />
                        <FormControlLabel value={"Kritický"} control={<Radio />} label="Kritický" />
                        <FormControlLabel value={"Katastrofický"} control={<Radio />} label="Katastrofický" />
                    </RadioGroup>
                    <p>Stav rizika</p>
                    <RadioGroup
                        row
                        className='radio'
                        value={status}
                        name="radio-buttons-group"
                        onChange={(e)=> setStatus(e.target.value)}   
                    >
                        <FormControlLabel value={"Koncept"} control={<Radio />} label="Koncept" />
                    </RadioGroup>
                    <button type="submit">
                        Vytvořit riziko
                    </button>
                </form>
            )}
        </Formik>
    );
};
