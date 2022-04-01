import React, { useState } from 'react';
import ButtonContainer from './ButtonContainer';

export const MyTest: React.FC<{}> = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <input
        type="checkbox"
        defaultChecked={isChecked}
        onChange={handleOnChange}
      />{' '}
      Render button
      { isChecked && <div className="button-container">
      <ButtonContainer/>
      </div>}
      
    </div>
  );
};
