import PageComponent from "../components/PageComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function Surveys() {
    const {surveys} = useStateContext()

    console.log(surveys)

    return (
        <>
           <PageComponent title="Surveys" buttons={<></>}>
                {surveys.map((survey, index) => (
                    <div key={index}>{JSON.stringify(survey)}</div>
                ))}
           </PageComponent>
        </>
    )
}