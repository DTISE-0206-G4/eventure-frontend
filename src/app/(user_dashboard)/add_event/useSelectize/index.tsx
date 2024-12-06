import { useRef, useEffect } from 'react';

interface SelectizeOptions {
  maxItems?: number;
  valueField?: string;
  labelField?: string;
  searchField?: string;
  options?: any[];
  create?: boolean;
  // Add more options as needed
}

const useSelectize = (options: SelectizeOptions): React.RefObject<HTMLSelectElement> => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const selectizeInstance = $(selectRef.current).selectize(options);

    return () => {
      if (selectizeInstance) {
        selectizeInstance.destroy();
      }
    };
  }, [options]);

  return selectRef;
};

export default useSelectize;