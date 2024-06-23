import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const Dropdown = ( {filterParam, setFilterParams, optionKey} ) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    if (filterParam.type === "checkbox") {
        setFilterParams(prev => ({
            ...prev,
            [`${optionKey}`]: {
              ...prev[optionKey],
              checked: checked
                ? [...prev[optionKey].checked, value]
                : prev[optionKey].checked.filter(item => item !== value)
            }
          }));
    }
    if (filterParam.type === "radio") {
        setFilterParams(prev => ({
            ...prev,
            [`${optionKey}`]: {
              ...prev[optionKey],
              checked: checked
                ? filterParam.elements.filter(item => item.name === value)
                : prev[optionKey].checked.filter(item => item !== value)
            }
          }));
    }
  };

  return (
    <div className="relative mx-1 w-max">
      <button className="px-2 py-1.5 text-sm text-start tracking-wide text-white capitalize transition-colors duration-300 bg-midnight rounded-sm hover:bg-neutral-600 focus:outline-none" onClick={toggleDropdown}>
        {filterParam.name}
        <span className="float-right pl-4"><FontAwesomeIcon className={`${isOpen ? 'rotate-180' : ''}`} icon={faAngleDown}/></span>
      </button>
      {isOpen && (
        <div className="absolute overflow-auto max-h-80 grid w-max py-1 bg-midnight rounded-sm top-10 z-10">
        {filterParam.elements.map((option, index) => (
            <div className="p-1" key={`${optionKey}-${index}`}>
            <input
            type={filterParam.type}
            value={filterParam.type === 'radio' ? option.name : option.value}
            name={filterParam.type === 'radio' ? 'year' : ''}
            onChange={(e) => handleOptionChange(e)} />
            <label htmlFor={`${optionKey}-${index}`} className="mx-1">{ option.name }</label>
            </div>
        ))}
      </div>
    )}
    </div>
  );
};

export default Dropdown;