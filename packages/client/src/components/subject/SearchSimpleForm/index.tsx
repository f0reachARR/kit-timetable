import { InputGroup, Spinner } from '@blueprintjs/core';
import React from 'react';
import { SubjectSearchQuery } from '../../../api/graphql.generated';

type Props = {
  isLoading: boolean;
  query: SubjectSearchQuery;
  onQueryChange: (query: SubjectSearchQuery) => void;
};

export const SearchSimpleForm = (props: Props) => {
  const [titleQuery, setTitleQuery] = React.useState('');

  const updateQuery = React.useCallback(() => {
    props.onQueryChange({
      title: titleQuery,
    });
  }, [props.onQueryChange, titleQuery]);

  const handleChangeTitleQuery = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleQuery(e.target.value);
      updateQuery();
    },
    [setTitleQuery],
  );

  return (
    <InputGroup
      large
      fill
      placeholder='Title...'
      leftIcon='search'
      value={titleQuery}
      onChange={handleChangeTitleQuery}
      rightElement={
        props.isLoading ? <Spinner size={Spinner.SIZE_SMALL} /> : undefined
      }
    />
  );
};
