import { Spinner, NonIdealState } from '@blueprintjs/core';
import React from 'react';
import { useGetSubjectQuery } from '../../api/graphql.generated';
import { SubjectDetails } from '../../components/subject/SubjectDetails';

type Props = {
  subjectId: string;
};
export const SubjectSearchDetailsDrawer = ({ subjectId }: Props) => {
  const { data, error, loading } = useGetSubjectQuery({
    variables: { id: subjectId },
  });

  if (error) {
    return <NonIdealState icon='warning-sign' title='Error occured' />;
  }

  if (loading || !data) {
    return (
      <div className='flex justify-center'>
        <Spinner size={Spinner.SIZE_LARGE} />
      </div>
    );
  }

  const { subject } = data;

  return (
    <div className='p-2 overflow-y-auto'>
      <SubjectDetails subject={subject} />
    </div>
  );
};
