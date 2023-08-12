export const useCreateStart = (rating: number | undefined) => {
  let star = [];
  for (let i = 0; i < 5; i++) {
    if (rating && i < rating) {
      star.push('star');
    } else {
      star.push('unstar');
    }
  }
  return star;
};
