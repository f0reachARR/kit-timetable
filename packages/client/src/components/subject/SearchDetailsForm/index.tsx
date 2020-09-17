import { ButtonGroup, RadioGroup, Radio } from '@blueprintjs/core';
import React from 'react';
import {
  SubjectSearchQuery,
  useGetSubjectSearchTermsQuery,
  SubjectScheduleSearchType,
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

  const handleSemesterChange = React.useCallback(
    (semester: string | null) => {
      props.onQueryChange({ semester });
    },
    [props.onQueryChange],
  );

  const handleYearChange = React.useCallback(
    (year: number | null) => {
      props.onQueryChange({ year });
    },
    [props.onQueryChange],
  );

  const handleDateChange = React.useCallback(
    (date: number | null) => {
      props.onQueryChange({ date });
    },
    [props.onQueryChange],
  );

  const handleHourChange = React.useCallback(
    (hour: number | null) => {
      props.onQueryChange({ hour });
    },
    [props.onQueryChange],
  );

  const handleTypeChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (
        e.currentTarget.value === SubjectScheduleSearchType.Intensive ||
        e.currentTarget.value === SubjectScheduleSearchType.Fixed
      ) {
        props.onQueryChange({ type: e.currentTarget.value });
      } else {
        props.onQueryChange({ type: null });
      }
    },
    [props.onQueryChange],
  );

  return (
    <div>
      {data && (
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
      )}
      <RadioGroup
        selectedValue={props.query.type ?? '_all'}
        onChange={handleTypeChange}
        inline
      >
        <Radio label='全て' value='_all' />
        <Radio label='通常' value={SubjectScheduleSearchType.Fixed} />
        <Radio label='集中' value={SubjectScheduleSearchType.Intensive} />
      </RadioGroup>
    </div>
  );
};
