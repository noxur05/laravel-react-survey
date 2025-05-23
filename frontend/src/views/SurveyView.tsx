import React, { useEffect, useState } from 'react';
import PageComponent from '../components/PageComponent';
import { PhotoIcon } from '@heroicons/react/24/outline';
import TButton from '../components/core/TButton';
import axiosClient from '../axios';
import { Question, Survey } from '../modals/survey.modal';
import { useNavigate, useParams } from 'react-router-dom';
import SurveyQuestions from '../components/SurveyQuestions';

const SurveyView: React.FC = () => {

  const navigate = useNavigate()
  const { id } = useParams();

  const [survey, setSurvey] = useState<Survey>({
    title: '',
    slug: '',
    status: false,
    description: '',
    image: null,
    image_url: '',
    expire_date: '',
    questions: [],

  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...survey };
    delete payload.image_url;
    let res = null;
    if (id) {
      res = axiosClient.put(`/survey/${id}`, payload);
    } else {
      res = axiosClient.post('/survey', payload);
    }
    res.then(function () {
      navigate('/surveys')
    }
    ).catch((error) => {
      if (error && error.response) {
        setError(error.response.data.message);
      }
    });
  };

  function onQuestionsUpdate(questions: Question[]) {
    setSurvey({
      ...survey,
      questions,
    });
  }

  const onImageChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSurvey({
        ...survey,
        image: reader.result as string,
        image_url: reader.result as string
      });
      if (e.target) e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/survey/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setSurvey({...data.data,
             questions: Array.isArray(data.data.questions) ? data.data.questions : []});
        })
    }
  }, [])
  return (
    <PageComponent title={!id ? 'Create New Survey' : 'Update Survey'} buttons={
      <></>
    }>
      {!loading && <form action='#' method='POST' onSubmit={onSubmit}>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            {error && <div className="bg-red-500 text-white py-3 px-3 rounded-lg">
              {error}
            </div>}
            <div className="">
              <label className='block text-sm font-medium text-gray-700'>
                Photo
              </label>
              <div className="mt-1 flex items-center">
                {survey.image_url && (
                  <img src={survey.image_url}
                    alt=''
                    className='w-32 h-32 object-cover' />
                )}
                {
                  !survey.image_url && (
                    <span className='flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                      <PhotoIcon className='w-8 h-8' />
                    </span>
                  )
                }
                <button
                  type='button'
                  className='relative ml-5 rounded-md border border-gray-300 bg-white 
                                            py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm
                                            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  Change
                  <input
                    type='file'
                    className='absolute left-0 top-0 right-0 bottom-0 opacity-0'
                    onChange={onImageChoose}
                  />
                </button>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700'
              >
                Survey Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={survey.title}
                onChange={(e) =>
                  setSurvey({ ...survey, title: e.target.value })
                }
                placeholder="Survey Title"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={survey.description}
                onChange={(e) =>
                  setSurvey({ ...survey, description: e.target.value })
                }
                placeholder="Describe your survey"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="expire_date"
                className="block text-sm font-medium text-gray-700"
              >
                Expire Date
              </label>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                value={survey.expire_date}
                onChange={(e) =>
                  setSurvey({ ...survey, expire_date: e.target.value })
                }
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="status"
                  name="status"
                  type="checkbox"
                  checked={survey.status}
                  onChange={(e) =>
                    setSurvey({ ...survey, status: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="comments"
                  className="font-medium text-gray-700"
                >
                  Active
                </label>
                <p className="text-gray-500">
                  Whether to make survey publicly available
                </p>
              </div>
            </div>
            <SurveyQuestions questions={survey.questions} onQuestionsUpdate={onQuestionsUpdate} />
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <TButton>Save</TButton>
          </div>
        </div>
      </form>}
    </PageComponent>
  );
};

export default SurveyView;