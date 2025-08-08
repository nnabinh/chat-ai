import { useState } from 'react';

export const useCharacterDescription = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return {
    isDescriptionExpanded,
    toggleDescription,
  };
};
