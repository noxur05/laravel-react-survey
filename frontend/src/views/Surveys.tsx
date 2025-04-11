import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";
import { Survey } from "../modals/survey.modal";

export default function Surveys() {
    const {surveys} = useStateContext()

    console.log(surveys)

    return (
        <>
           <PageComponent title="Surveys" buttons={<></>}>
                {surveys.map((survey: Survey) => (
                    <SurveyListItem survey={survey} key={survey.id}/>
                ))}
           </PageComponent>
        </>
    )
}