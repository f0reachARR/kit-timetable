import { HTMLTable } from '@blueprintjs/core';
import React from 'react';
import { SubjectPlan } from '../../api/graphql.generated';

type Props = {
  items: readonly SubjectPlan[];
};
export const SubjectPlanTable = ({ items }: Props) => {
  return (
    <HTMLTable>
      <thead>
        <tr>
          <th>#</th>
          <th>タイトル</th>
          <th>詳細</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.topic}</td>
            <td>{item.content || 'n/a'}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
};
