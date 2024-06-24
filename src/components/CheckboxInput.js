import React, { useEffect, useState } from 'react'

function CheckboxInput({filterParam, handleOptionChange, optionKey, option, index}) {
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if (filterParam.type === 'radio') {
            setIsChecked(!!filterParam.checked.length ? filterParam.checked[0].name === option.name : false
            )
        }
        else {
            setIsChecked(filterParam.checked.includes(`${option.value}`))
        }
    }, [isChecked])

  return (
    <>
            <input
        type={filterParam.type}
        value={filterParam.type === 'radio' ? option.name : option.value}
        name={filterParam.type === 'radio' ? 'year' : ''}
        checked={isChecked} 
        onChange={(e) => {
            handleOptionChange(e)
            setIsChecked(!isChecked)
        }}
    />
        <label htmlFor={`${optionKey}-${index}`} className="mx-1">{ option.name }</label>
    </>
  )
}

export default CheckboxInput
