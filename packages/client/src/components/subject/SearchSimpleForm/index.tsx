import { InputGroup, Spinner } from '@blueprintjs/core';
import React from 'react';
import { SubjectSearchQuery } from '../../../api/graphql.generated';

type Props = {
  isLoading: boolean;
  query: SubjectSearchQuery;
  onQueryChange: (queryPartial: SubjectSearchQuery) => void;
};

export const SearchSimpleForm = (props: Props) => {
  const handleChangeTitleQuery = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onQueryChange({
        title: e.target.value,
      });
    },
    [props.onQueryChange],
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
