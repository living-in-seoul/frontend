export const useCreateStart = (rating: number) => {
  let star = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      star.push('star');
    } else {
      star.push('unstar');
    }
  }
  return star;
};
