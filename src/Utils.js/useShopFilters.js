import { useState, useMemo } from "react";

export default function useShopFilters() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [isDiscounted, setIsDiscounted] = useState(false);

  // Dynamically compute title
  const displayTitle = useMemo(() => {
    let title = "Svi proizvodi";

    if (selectedCategory) title = selectedCategory;
    if (isNew && selectedCategory) title = `Novo iz ${selectedCategory}`;
    if (isDiscounted && selectedCategory) title = `Popust na ${selectedCategory}`;
    if (selectedSubcategory) title = selectedSubcategory;
    if (selectedLanguage) title += ` - ${selectedLanguage}`;

    return title;
  }, [selectedCategory, selectedSubcategory, selectedLanguage, isNew, isDiscounted]);

  return {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    selectedLanguage,
    setSelectedLanguage,
    isNew,
    setIsNew,
    isDiscounted,
    setIsDiscounted,
    displayTitle,
  };
}
