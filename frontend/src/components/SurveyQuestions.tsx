import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"
import { Question } from "../modals/survey.modal";
import QuestionEditor from "./QuestionEditor";

interface SurveyQuestionsProps {
  questions: Question[];
  onQuestionsUpdate: (updatedQuestion: Question[]) => void;
}

export default function SurveyQuestions({ questions, onQuestionsUpdate }: SurveyQuestionsProps) {
  const [myQuestions, setMyQuestions] = useState<Question[]>([...questions]);

  const addQuestion = (index?: number) => {
    index = index || myQuestions.length || 0;
    myQuestions.splice(index, 0, {
      id: uuidv4(),
      type: 'text',
      question: '',
      description: '',
      data: {}
    })
    setMyQuestions([...myQuestions]);
    onQuestionsUpdate(myQuestions);
  }

  const questionChange = (question: Question) => {
    if (!question) return;

    const newQuestions = myQuestions?.map((q) => {
      if (q.id == question.id) {
        return { ...question };
      }
      return q;
    });
    setMyQuestions(newQuestions);
    onQuestionsUpdate(newQuestions);
  }


  const deleteQuestion = (question: Question) => {
    const newQuestions = myQuestions?.filter(q => q.id !== question.id);
    setMyQuestions(newQuestions);
    onQuestionsUpdate(newQuestions);
  }


  useEffect(() => {
    setMyQuestions(questions);
  }, [questions])
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
      {myQuestions?.length ? (
        myQuestions.map((q, index) => (
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