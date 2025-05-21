import { PlusCircleIcon } from "@heroicons/react/24/outline";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import { Survey } from "../modals/survey.modal";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import PaginationLinks from "../components/PaginationLinks";
import { ILink, IMeta } from "../modals/modal";

export default function Surveys() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<IMeta>();

  const onDeleteClick = () => {
    console.log('On Click');
  }

  const getSurveys = (url: string | null) => {
    console.log(url)
    setLoading(true);
    url = url || '/survey';
    axiosClient.get(url).then(({ data }) => {
      setLoading(false);
      setSurveys(data.data)
      setMeta(data.meta);
    }
    ).catch((error) => {
      console.log(error);
    })
  }


  useEffect(() => {
    getSurveys(null);
  }, [])

  const onPageClick = (link: ILink) => {
    getSurveys(link.url);
  }
  return (
    <>
      <PageComponent title="Surveys" buttons={
        (
          <TButton color="green" to="/surveys/create">
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Create New
          </TButton>
        )
      }>
        {loading && (
          <div className="text-center text-lg">
            Loading...
          </div>
        )}
        {!loading && (
          <div className="">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {surveys.map((survey: Survey, index: number) => (
                <SurveyListItem survey={survey} key={index} onDeleteClick={onDeleteClick} />
              ))}
            </div>
            <PaginationLinks meta={meta} onPageClick={onPageClick}/>
          </div>
        )}
      </PageComponent>
    </>
  )
}