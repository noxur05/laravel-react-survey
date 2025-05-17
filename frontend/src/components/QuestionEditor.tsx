import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Question } from "../modals/survey.modal";

type QuestionEditorProps = {
  index: number;
  question: Question;
  addQuestion: (index: number) => void;
  deleteQuestion: (question: Question) => void;
  questionChange: (question: Question) => void;
};

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  index,
  question,
  addQuestion,
  deleteQuestion,
  questionChange,
}) => {

  const [model, setModel] = useState({ ...question });
  const { questionTypes } = useStateContext();

  useEffect(() => {
    questionChange(model);
  }, [model]);

  function upperCaseFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <div className="flex justify-between mb-3">
        <h4 className="">
          {index + 1}. {model.question}
        </h4>
        <div className="flex items-center">
          <button
            type="button"
            className="
                            flex
                            items-center
                            text-xs
                            py-1
                            px-3
                            mr-2
                            rounded-sm
                            text-white
                            bg-gray-600
                            hover:bg-gray-700
                        "
            onClick={() => addQuestion(index + 1)}
          >
            <PlusIcon className="w-4" />
            add
          </button>
          <button
            type="button"
            className="
                            flex
                            items-center
                            text-xs
                            py-1
                            px-3
                            rounded-sm
                            border border-transparent
                            text-red-500
                            hover:border-red-600
                            font-semibold
                        "
            onClick={() => deleteQuestion(question)}
          >
            <TrashIcon className="w-4" />
            Delete
          </button>
        </div>
      </div>
      <div className="flex gap-3 justify-between mb-3">
        <div className="flex-1">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Question
          </label>
          <input
            type="text"
            name="question"
            id="question"
            value={model.question}
            onChange={(e) =>
              setModel({ ...model, question: e.target.value })
            }
            placeholder="Question"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="">
          <label
            htmlFor="questionType"
            className="block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <select
            name="type"
            id="tyquestionType"
            value={model.type}
            onChange={(e) =>
              setModel({ ...model, type: e.target.value })
            }
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {questionTypes.map((type, index) => (
              <option key={index} value={type}>
                {upperCaseFirst(type)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="questionDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="questionDescription"
          id="questionDescription"
          value={model.description || ""}
          onChange={(ev) =>
            setModel({ ...model, description: ev.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
    </>
  );
};

export default QuestionEditor;