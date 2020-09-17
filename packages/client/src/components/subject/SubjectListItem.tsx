import React from 'react';
import { SubjectSimpleFragment } from '../../api/graphql.generated';
import { createSubjectDateLabel } from '../../utils/subject';

export const SubjectListItem = ({ item }: { item: SubjectSimpleFragment }) => {
  return (
    <div className='flex justify-between py-2 md:px-1'>
      <div>
        <h2 className='inline text-xl text-semibold truncate max-w-full'>
          {item.title}
        </h2>
        <h3 className='inline mx-3'>{item.class}</h3>
      </div>
      {item.credits && (
        <span className='float-right leading-6 invisible sm:visible'>
          {createSubjectDateLabel(item)} {item.credits}単位
        </span>
      )}
    </div>
  );
};
