import { MenuItem, Button } from '@blueprintjs/core';
import { Select as SelectBase, ItemRenderer } from '@blueprintjs/select';
import React from 'react';

type Props<T> = {
  items: Array<T | null>;
  selected?: T | null;
  disabled?: boolean;
  onChange: (item: T | null) => void;
};

type TextTransform<T> = (input: T | null) => string;

export function createSearchSelect<T extends string | number>(
  transform?: TextTransform<T>,
) {
  const renderItem: ItemRenderer<T | null> = (
    item,
    { handleClick, modifiers },
  ) => {
    const transformed = transform ? transform(item) : item;
    return (
      <MenuItem
        onClick={handleClick}
        active={modifiers.active}
        text={transformed ?? '全て'}
        disabled={modifiers.disabled}
        key={item ?? 'all'}
      />
    );
  };

  const Select = (props: Props<T>) => {
    const transformedSelect = React.useMemo(() => {
      return transform ? transform(props.selected ?? null) : props.selected;
    }, [props.selected]);
    const handleSelect = React.useCallback(
      (item: T | null) => {
        props.onChange(item);
      },
      [props.onChange],
    );

    return (
      <SelectBase
        itemRenderer={renderItem}
        items={props.items}
        onItemSelect={handleSelect}
        filterable={false}
        disabled={props.disabled || props.items.length === 0}
        popoverProps={{ minimal: true }}
        activeItem={props.selected}
      >
        <Button
          rightIcon='caret-down'
          className='focus:outline-none'
          text={transformedSelect ?? '指定なし'}
          disabled={props.disabled}
          loading={props.items.length === 0}
        />
      </SelectBase>
    );
  };

  return Select;
}
