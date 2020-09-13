import React from 'react';
import { SearchSimpleForm } from '../../components/subject/SearchSimpleForm';

export const SubjectSearch = () => {
  return (
    <div className='container max-w-screen-md mx-auto my-3 px-3'>
      <SearchSimpleForm query={{}} isLoading onQueryChange={() => {}} />
    </div>
  );
};
