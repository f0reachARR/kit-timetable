import { Button, Collapse } from '@blueprintjs/core';
import React from 'react';

type Props = React.PropsWithChildren<{
  title: string;
  initialOpen?: boolean;
}>;
export const CollapseCallout = ({ title, children, initialOpen }: Props) => {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  const toggleOpen = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return (
    <div className='p-3 pt-1 m-2 border border-gray-500 rounded shadow'>
      <Button
        minimal
        onClick={toggleOpen}
        fill
        rightIcon={isOpen ? 'chevron-up' : 'chevron-down'}
        alignText='left'
        className='focus:outline-none'
        large
      >
        {title}
      </Button>
      <Collapse isOpen={isOpen} className='px-4'>
        {children}
      </Collapse>
    </div>
  );
};
