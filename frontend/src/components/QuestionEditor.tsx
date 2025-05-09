import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { PlusIcon } from "@heroicons/react/24/outline";

const QuestionEditor = ({
    index,
    question,
    addQuestion,
    deleteQuestion,
    questionChange,
}) => {

    const [model, setModel] = useState({...question});
    const { questionTypes } = useStateContext();

    useEffect(() => {
        questionChange(model);
    },[model]);

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
                        hover:bg-gray-700"
                        onClick={() => addQuestion(index + 1)}
                    >
                        <PlusIcon className="w-4" />
                        add
                    </button>
                </div>
            </div>
        </>
    );
};

export default QuestionEditor;