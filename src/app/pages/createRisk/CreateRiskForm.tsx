import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { CategoryApi, ProjectApi } from "../../../api";
import { ERiskCats, ERiskStatus, ICreateRisk, IProject } from "../../../types";
import { CreateCategory } from "../../components/CreateCategory";
import { RiskInputFormik } from "../../components/RiskInput";
import "./CreateRisk.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

interface IProps {
    className?: string;
    project: IProject;
}

export const CreateRiskForm: FC<IProps> = ({ project }) => {
    const navigate = useNavigate();

    const [showCategoryForm, setShowCategoryForm] = useState(false);

    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => CategoryApi.getAll(),
    });

    const initialValues = {
        title: "",
        description: "",
        danger: "",
        trigger: "",
        reaction: "",
        status: ERiskStatus.CONCEPT,
        impact: ERiskCats.LOW,
        probability: ERiskCats.LOW,
        category: "",
        project_pk: project.pk.toString(),
    };

    const loginFormValidationSchema = object().shape({
        title: string().required("Toto pole je povinné"),
        description: string().required("Toto pole je povinné"),
        danger: string().required("Toto pole je povinné"),
        trigger: string().required("Toto pole je povinné"),
        reaction: string().required("Toto pole je povinné"),
    });

    const { mutate: createRisk } = useMutation({
        mutationFn: (data: ICreateRisk) => {
            return ProjectApi.createProjectRisk(data);
        },
        onSuccess: () => {
            toast.success("Risk created");
            navigate("/project/" + project.pk);
        },
        onError: () => {
            toast.error("Creating category failed");
        },
    });

    // TODO -> functionality of button after creating new risk (submitting form)
    const createRiskForm = (data: ICreateRisk) => {
        data.project_pk = project.pk.toString();
        createRisk(data);
        console.log(data);
    };
    // TODO -> in probability and impact radio boxes (if project is using reduced scales then other radio buttons must be disabled (TINY, EXTREME must be disabled)) add prop to FormControlLabel disabled={condition}
    // TODO -> add one more Radio button choices for Risk Category (should be dynamically rendered (cause risk categories are bounded to the project))
    return (
        <>
            <Formik onSubmit={createRiskForm} validationSchema={loginFormValidationSchema} initialValues={initialValues}>
                {({ handleSubmit, values, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                        <RiskInputFormik className="my-6 text-#1d3746 w-100" label="Název rizika" name={"title"} type={"text"} placeholder={"Názov"} required />
                        <RiskInputFormik
                            className="my-6 text-#1d3746 w-100"
                            label="Popis rizika"
                            name={"description"}
                            type={"text"}
                            placeholder={"Popis"}
                            required
                        />
                        <RiskInputFormik
                            className="my-6 text-#1d3746 w-100"
                            label="Nebezpečenství rizika"
                            name={"danger"}
                            type={"text"}
                            placeholder={"Nebezpečenství"}
                            required
                        />
                        <RiskInputFormik
                            className="my-6 text-#1d3746 w-100"
                            label="Spušteč rizika"
                            name={"trigger"}
                            type={"text"}
                            placeholder={"Spušteč"}
                            required
                        />
                        <RiskInputFormik
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
                        <div>
                            <div className="risks">Kategorie rizík:</div>
                            <div className="flex gap-4">
                                {categoriesLoading && <p>Loading...</p>}
                                {!categoriesLoading && (
                                    <select
                                        className="basis-2/3 border-2 rounded-md text-gray-700"
                                        name={"category"}
                                        onChange={(event) => {
                                            setFieldValue("category", event.target.value);
                                        }}
                                    >
                                        {categories &&
                                            categories.map((category) => (
                                                <option key={category.pk} value={category.pk}>
                                                    {category.fields.name}
                                                </option>
                                            ))}
                                    </select>
                                )}
                                <button className="basis-1/3" type="button" onClick={() => setShowCategoryForm(true)}>
                                    Přidat kategorii
                                </button>
                            </div>
                        </div>

                        <button className="mt-4" type="submit">
                            Vytvořit riziko
                        </button>
                    </form>
                )}
            </Formik>
            <CreateCategory show={showCategoryForm} setShow={setShowCategoryForm} />
        </>
    );
};
