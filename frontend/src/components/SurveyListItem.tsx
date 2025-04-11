import React from 'react';
import { Survey } from '../modals/survey.modal';

interface SurveyListItemProps {
    survey: Survey;
    key: number | string;
}

const SurveyListItem: React.FC<SurveyListItemProps> = ({ survey, key}) => {
    return (
        <>
        [{survey}, {key}]
        </>
    );
};

export default SurveyListItem;