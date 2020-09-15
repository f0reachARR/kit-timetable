import React from 'react';
import { SubjectSimpleFragment } from '../../api/graphql.generated';

export const SubjectListItem = ({ item }: { item: SubjectSimpleFragment }) => {
  return (
    <>
      <h2 className='inline text-xl text-semibold'>{item.title}</h2>
      <h3 className='inline mx-3'>{item.class}</h3>
      {item.credits && (
        <span className='float-right leading-6'>{item.credits}単位</span>
      )}
    </>
  );
};
