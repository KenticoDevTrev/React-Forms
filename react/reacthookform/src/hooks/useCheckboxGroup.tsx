import React, { useState, useCallback } from 'react';
export interface ICheckboxState<TValue> {
  label: string;
  checked : boolean;
  value : TValue
}
export interface ICheckboxItem<TValue> {
  label?: string;
  value : TValue;
}
export function useCheckboxGroup<TValue>(items : Array<ICheckboxItem<TValue>>, defaultValues : Array<TValue>) : [() => Array<ICheckboxState<TValue>>, (value:TValue) => Array<TValue>] {
  const [checkedValues, setCheckedValues] = useState(defaultValues);
  const [possibleCheckboxItems, setAllValues] = useState(items);

  function handleCheckboxChange(checkedValue : TValue) : Array<TValue> {
    const newValues = checkedValues?.includes(checkedValue)
      ? checkedValues?.filter(name => name !== checkedValue)
      : [...(checkedValues ?? []), checkedValue];
      setCheckedValues(newValues);
      return newValues;
  };

    const getCheckedValues = () => possibleCheckboxItems.map((item) => {
      return {
        // @ts-ignore
        label: item.label ? item.label : item.value?.toString(),
        checked: checkedValues.indexOf(item.value) !== -1,
        value: item.value
      }
    });

  return [getCheckedValues, handleCheckboxChange]
}