import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { Question, Survey } from "../modals/survey.modal";
import QuestionEditor from "./QuestionEditor";

interface SurveyQuestionsProps {
  survey: Survey;
  onSurveyUpdate: (updatedSurvey: Survey) => void;
}

export default function SurveyQuestions({ survey, onSurveyUpdate }: SurveyQuestionsProps) {
  const [model, setModel] = useState<Survey>({ ...survey, questions: survey.questions || [] });

  const addQuestion = (index?: number) => {
    index = index || model.questions?.length || 0;
    model.questions?.splice(index, 0, {
      id: uuidv4(),
      type: 'text',
      question: '',
      description: '',
      data: {}
    })
    setModel({
      ...model,
      questions: [
        ...model.questions ?? [],
      ]
    })
  }

  const questionChange = (question: Question) => {
    if (!question) return;

    const newQuestions = model.questions?.map((q) => {
      if (q.id == question.id) {
        return { ...question };
      }
      return q;
    });
    setModel({
      ...model,
      questions: newQuestions
    });
  }


  const deleteQuestion = (question: Question) => {
    const newQuestions = model.questions?.filter(q => q.id !== question.id);
    setModel({
      ...model,
      questions: newQuestions
    });
  }


  useEffect(() => {
    onSurveyUpdate(model);
  }, [model])
  return (
    <>
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Questions</div>
        <button
          type="button"
          className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
          onClick={() => addQuestion()}
        >
          <PlusIcon className="w-4 mr-2" />
          Add question
        </button>
      </div>
      {model.questions?.length ? (
        model.questions.map((q, index) => (
          <QuestionEditor
            key={q.id}
            index={index}
            question={q}
            questionChange={questionChange}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))
      ) : (
        <div className="text-gray-400 text-center py-4">
          You don't have any questions created
        </div>
      )}
    </>
  )
}