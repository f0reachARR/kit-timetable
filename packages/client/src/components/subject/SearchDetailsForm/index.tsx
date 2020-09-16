import React from 'react';
import {
  SubjectSearchQuery,
  useGetSubjectSearchTermsQuery,
} from '../../../api/graphql.generated';
import { DATE_LABELS } from '../../../constants';
import { createSearchSelect } from './SearchSelect';

type Props = {
  query: SubjectSearchQuery;
  onQueryChange: (queryPartial: SubjectSearchQuery) => void;
};

const SemesterSelect = createSearchSelect<string>((semester) =>
  semester !== null ? `セメ: ${semester}` : 'セメ: 全て',
);

const YearsSelect = createSearchSelect<number>((year) =>
  year !== null ? `学年: ${year}年` : '学年: 全て',
);

const HoursSelect = createSearchSelect<number>((hour) =>
  hour !== null ? `時限: ${hour}時間` : '時限: 全て',
);

const DateSelect = createSearchSelect<number>((date) =>
  date !== null ? `曜日: ${DATE_LABELS[date]}曜日` : '曜日: 全て',
);

export const SearchDetailsForm = (props: Props) => {
  const { data } = useGetSubjectSearchTermsQuery();
  const { semesters, years, hours } = React.useMemo(
    () => ({
      semesters: [null, ...(data?.subjectSearchTerms.semesters.slice() ?? [])],
      years: [null, ...(data?.subjectSearchTerms.years.slice() ?? [])],
      hours: [null, ...(data?.subjectSearchTerms.hours.slice() ?? [])],
    }),
    [data],
  );

  return (
    <div className='grid grid-cols-4 gap-3 my-2 mx-1'>
      <div>
        <SemesterSelect
          items={semesters}
          selected={props.query.semester}
          onChange={(semester) => {
            props.onQueryChange({ semester });
          }}
        />
      </div>
      <div>
        <YearsSelect
          items={years}
          selected={props.query.year}
          onChange={(year) => {
            props.onQueryChange({ year });
          }}
        />
      </div>
      <div>
        <DateSelect
          items={[null, 0, 1, 2, 3, 4]}
          selected={props.query.date}
          onChange={(date) => {
            props.onQueryChange({ date });
          }}
        />
      </div>
      <div>
        <HoursSelect
          items={hours}
          selected={props.query.hour}
          onChange={(hour) => {
            props.onQueryChange({ hour });
          }}
        />
      </div>
    </div>
  );
};
