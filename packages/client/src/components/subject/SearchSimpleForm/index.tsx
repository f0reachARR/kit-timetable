import { InputGroup, Spinner } from '@blueprintjs/core';
import React from 'react';
import { SubjectSearchQuery } from '../../../api/graphql.generated';

type Props = {
  isLoading: boolean;
  query: SubjectSearchQuery;
  onQueryChange: (query: SubjectSearchQuery) => void;
};

export const SearchSimpleForm = (props: Props) => {
  const updateQuery = React.useCallback(
    (merge: SubjectSearchQuery) => {
      props.onQueryChange({
        ...props.query,
        ...merge,
      });
    },
    [props.onQueryChange, props.query],
  );

  const handleChangeTitleQuery = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateQuery({
        title: e.target.value,
      });
    },
    [updateQuery],
  );

  return (
    <InputGroup
      large
      fill
      placeholder='Title...'
      leftIcon='search'
      value={props.query.title || ''}
      onChange={handleChangeTitleQuery}
      rightElement={
        props.isLoading ? <Spinner size={Spinner.SIZE_SMALL} /> : undefined
      }
    />
  );
};
