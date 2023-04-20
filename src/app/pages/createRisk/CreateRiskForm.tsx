import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import { object, string } from "yup";
import { ERiskCats, ERiskStatus, IRiskCreate } from "../../../types";
import { CreateProjectInputFormik } from "../../components/CreateProjectInput";
import "./CreateRisk.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface IProps {
    className?: string;
}

export const CreateRiskForm: FC<IProps> = () => {
    const initialValues = {
        name: "",
        description: "",
        danger: "",
        trigger: "",
        reaction: "",
        status: ERiskStatus.CONCEPT,
        impact: ERiskCats.LOW,
        probability: ERiskCats.LOW,
    };

    const loginFormValidationSchema = object().shape({
        name: string().required("Toto pole je povinné"),
        description: string().required("Toto pole je povinné"),
        danger: string().required("Toto pole je povinné"),
        trigger: string().required("Toto pole je povinné"),
        reaction: string().required("Toto pole je povinné"),
    });

    // TODO -> functionality of button after creating new risk (submitting form)
    const createProject = (data: IRiskCreate) => {
        console.log("Creating Risk!", data.impact);
    };
    // TODO -> in probability and impact radio boxes (if project is using reduced scales then other radio buttons must be disabled (TINY, EXTREME must be disabled)) add prop to FormControlLabel disabled={condition}
    // TODO -> add one more Radio button choices for Risk Category (should be dynamically rendered (cause risk categories are bounded to the project))
    return (
        <Formik onSubmit={createProject} validationSchema={loginFormValidationSchema} initialValues={initialValues}>
            {({ handleSubmit, values, setFieldValue }) => (
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
                        className="radio"
                        value={values.probability}
                        name="probability"
                        onChange={(val) => {
                            setFieldValue("probability", val.target.value);
                        }}
                    >
                        <FormControlLabel value={ERiskCats.TINY} control={<Radio />} label="Nepatrná" />
                        <FormControlLabel value={ERiskCats.LOW} control={<Radio />} label="Malá" />
                        <FormControlLabel value={ERiskCats.MEDIUM} control={<Radio />} label="Střední" />
                        <FormControlLabel value={ERiskCats.HIGH} control={<Radio />} label="Velká" />
                        <FormControlLabel value={ERiskCats.EXTREME} control={<Radio />} label="Mimořádne velká" />
                    </RadioGroup>
                    <p>Dopad rizika</p>
                    <RadioGroup
                        row
                        className="radio"
                        value={values.impact}
                        name="impact"
                        onChange={(val) => {
                            setFieldValue("impact", val.target.value);
                        }}
                    >
                        <FormControlLabel value={ERiskCats.TINY} control={<Radio />} label="Nepatrný" />
                        <FormControlLabel value={ERiskCats.LOW} control={<Radio />} label="Malý" />
                        <FormControlLabel value={ERiskCats.MEDIUM} control={<Radio />} label="Cititelný" />
                        <FormControlLabel value={ERiskCats.HIGH} control={<Radio />} label="Kritický" />
                        <FormControlLabel value={ERiskCats.EXTREME} control={<Radio />} label="Katastrofický" />
                    </RadioGroup>
                    <p>Stav rizika</p>
                    <RadioGroup
                        row
                        className="radio"
                        value={values.status}
                        name="status"
                        onChange={(val) => {
                            setFieldValue("status", val.target.value);
                        }}
                    >
                        <FormControlLabel value={ERiskStatus.CONCEPT} control={<Radio />} label="Koncept" />
                    </RadioGroup>
                    <button type="submit">Vytvořit riziko</button>
                </form>
            )}
        </Formik>
    );
};
