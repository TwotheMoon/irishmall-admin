// 카테고리 배열 문자 포멧 전환
export const formatCategory = (data) => {
  const categories = [
    data.category1 || "",
    data.category2 || "",
    data.category3 || "",
    data.category4 || "",
  ];

  const nonEmptyCategories = categories.filter(category => category);
  return nonEmptyCategories.join('>');
}

// 인기 카테고리 3개 선택
export const getPopularCategories = (items, topN = 3) => {
  const categoryCounts = {};

  items.forEach(item => {
    const formatted = formatCategory(item);
    categoryCounts[formatted] = (categoryCounts[formatted] || 0) + 1;
  });

  const sortedCategories = Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, topN);

  while (sortedCategories.length < topN){
    sortedCategories.push([false, 0]);
  }

  return sortedCategories.map(([category]) => category);
}