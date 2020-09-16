import React from 'react';
import {
  SubjectSimpleFragment,
  SubjectScheduleType,
} from '../../api/graphql.generated';
import { DATE_LABELS } from '../../constants';

const createDateLabel = (item: SubjectSimpleFragment) => {
  const category = item.categories[0];
  if (
    category.schedule.type === SubjectScheduleType.Fixed &&
    category.schedule.days
  ) {
    if (category.schedule.days.length === 1) {
      const { date, hour } = category.schedule.days[0];
      return `${category.year}年 ${category.semester} ${DATE_LABELS[date]}曜 ${hour}限`;
    } else {
      const { date, hour } = category.schedule.days[0];
      const { hour: lastHour } = category.schedule.days[
        category.schedule.days.length - 1
      ];
      return `${category.year}年 ${category.semester} ${DATE_LABELS[date]}曜 ${hour}-${lastHour}限`;
    }
  }
  if (category.schedule.type === SubjectScheduleType.Intensive) {
    return `${category.year}年 ${category.semester} 集中`;
  }
  return '不明';
};

export const SubjectListItem = ({ item }: { item: SubjectSimpleFragment }) => {
  return (
    <>
      <h2 className='inline text-xl text-semibold'>{item.title}</h2>
      <h3 className='inline mx-3'>{item.class}</h3>
      {item.credits && (
        <span className='float-right leading-6 invisible sm:visible'>
          {createDateLabel(item)} {item.credits}単位
        </span>
      )}
    </>
  );
};
