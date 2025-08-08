import { useState } from 'react';

export const useCharacterDescription = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const resetDescription = () => {
    setIsDescriptionExpanded(false);
  };

  return {
    isDescriptionExpanded,
    toggleDescription,
    resetDescription,
  };
};
