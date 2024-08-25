import React, { PropsWithChildren } from 'react';

type Props = {
  units?: string;
  spanClassName?: string;
  divClassName?: string;
};

const ResultClacBox = ({ children, units, spanClassName, divClassName }: PropsWithChildren<Props>) => {
  return (
    <div className={`flex items-center gap-2 ${divClassName}`}>
      <span className={`flex items-center w-32 px-3 py-2 h-12 bg-gray-800 text-white border border-gray-600 rounded-md ${spanClassName}`}>
        {children}
      </span>
      {units && <span className='whitespace-nowrap'>{units}</span>}
    </div>
  );
};

export default ResultClacBox;
