import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";
import { Survey } from "../modals/survey.modal";

export default function Surveys() {
    const {surveys} = useStateContext()

    console.log(surveys)

    const onDeleteClick = () => {
        console.log('On Click');
    }

    return (
        <>
           <PageComponent title="Surveys" buttons={<></>}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {surveys.map((survey: Survey) => (
                    <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick}/>
                ))}
            </div>
           </PageComponent>
        </>
    )
}