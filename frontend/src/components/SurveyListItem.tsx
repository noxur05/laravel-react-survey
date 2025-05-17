import React from 'react';
import { SurveyListItemProps } from '../modals/survey.modal';
import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import TButton from './core/TButton';

const SurveyListItem: React.FC<SurveyListItemProps> = ({ survey, key, onDeleteClick }) => {

  return (
    <>
      <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]" key={key}>
        <img src={survey.image_url} alt={survey.title} className='w-full h-48 object-cover' />
        <div className="h4 mt-4 text-lg font-bold">
          {survey.title}
        </div>
        <div className="overflow-hidden flex-1"
          dangerouslySetInnerHTML={{ __html: survey.description }}
        ></div>
        <div className="flex justify-between items-center mt-3">
          <TButton to={`surveys/${survey.id}`}>
            <PencilIcon className='w-5 h-5 mr-2' /> Edit
          </TButton>
          <div className="flex items-center">
            <TButton href={`/view/survey/${survey.slug}`} circle link>
              <ArrowTopRightOnSquareIcon className='w-5 h-5' />
            </TButton>
            {survey.id && (
              <TButton onClick={onDeleteClick} circle link color='red'>
                <TrashIcon className='w-5 h-5' />
              </TButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyListItem;