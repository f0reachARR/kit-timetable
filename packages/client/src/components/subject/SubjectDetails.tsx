import { H3, Breadcrumbs } from '@blueprintjs/core';
import React from 'react';
import { SubjectDetailsFragment } from '../../api/graphql.generated';
import { createSubjectDateLabel } from '../../utils/subject';
import { CollapseCallout } from '../shared/CollapseCallout';
import { SubjectPlanTable } from './SubjectPlanTable';

type Props = {
  subject: SubjectDetailsFragment;
};
export const SubjectDetails = ({ subject }: Props) => {
  const breadcrumbItems = React.useMemo(() => {
    const category = subject.categories[0];

    return [
      category.faculty,
      category.field,
      category.program,
      category.category,
    ]
      .filter<string>((str): str is string => !!str)
      .map((item) => ({
        text: item,
      }));
  }, [subject.categories]);
  return (
    <div>
      <H3>
        {subject.class ? `${subject.title} [${subject.class}]` : subject.title}
      </H3>
      <Breadcrumbs items={breadcrumbItems} />
      <span className='text-base text-gray-800'>
        {createSubjectDateLabel(subject)}
      </span>
      <CollapseCallout title='概要' initialOpen>
        <span className='text-base text-gray-800 whitespace-pre-wrap'>
          {subject.outline}
        </span>
      </CollapseCallout>
      <CollapseCallout title='成績評価' initialOpen>
        <span className='text-base text-gray-800 whitespace-pre-wrap'>
          {subject.gradingPolicy}
        </span>
      </CollapseCallout>
      <CollapseCallout title='目標'>
        <span className='text-base text-gray-800 whitespace-pre-wrap'>
          {subject.purpose}
        </span>
      </CollapseCallout>
      <CollapseCallout title='留意すること'>
        <span className='text-base text-gray-800 whitespace-pre-wrap'>
          {subject.point}
        </span>
      </CollapseCallout>
      <CollapseCallout title='注意事項' initialOpen>
        <span className='text-base text-gray-800 whitespace-pre-wrap'>
          {subject.remark}
        </span>
      </CollapseCallout>
      <CollapseCallout title='教科書' initialOpen>
        <span className='text-base text-gray-800 whitespace-pre-wrap'>
          {subject.textbook}
        </span>
      </CollapseCallout>
      {subject.plans.length > 0 && (
        <CollapseCallout title='授業計画'>
          <SubjectPlanTable items={subject.plans} />
        </CollapseCallout>
      )}
    </div>
  );
};
