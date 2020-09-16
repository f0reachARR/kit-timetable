import { ButtonGroup } from '@blueprintjs/core';
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
  forceUpdate?: () => void;
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

  const handleUpdate = React.useCallback(() => {
    if (props.forceUpdate) props.forceUpdate();
  }, [props.forceUpdate]);

  const handleSemesterChange = React.useCallback(
    (semester: string | null) => {
      props.onQueryChange({ semester });
      handleUpdate();
    },
    [props.onQueryChange],
  );

  const handleYearChange = React.useCallback(
    (year: number | null) => {
      props.onQueryChange({ year });
      handleUpdate();
    },
    [props.onQueryChange],
  );

  const handleDateChange = React.useCallback(
    (date: number | null) => {
      props.onQueryChange({ date });
      handleUpdate();
    },
    [props.onQueryChange],
  );

  const handleHourChange = React.useCallback(
    (hour: number | null) => {
      props.onQueryChange({ hour });
      handleUpdate();
    },
    [props.onQueryChange],
  );

  return (
    <div className=''>
      <ButtonGroup className='m-2'>
        <SemesterSelect
          items={semesters}
          selected={props.query.semester}
          onChange={handleSemesterChange}
        />
        <YearsSelect
          items={years}
          selected={props.query.year}
          onChange={handleYearChange}
        />
        <DateSelect
          items={[null, 0, 1, 2, 3, 4]}
          selected={props.query.date}
          onChange={handleDateChange}
        />
        <HoursSelect
          items={hours}
          selected={props.query.hour}
          onChange={handleHourChange}
        />
      </ButtonGroup>
    </div>
  );
};
