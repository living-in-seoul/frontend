/**요청 재시도 */
export async function retryFetch(
  url: string,
  options: any,
  maxAttempts = 3,
  delay = 1000,
): Promise<Response> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status !== 429) {
        return response;
      }
    } catch (err) {}
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error('너무 많은 요청');
}

/** 이미지 가져오기 */
export const getImageSrc = (code: string) => {
  const ImageSrc = `${process.env.NEXT_PUBLIC_GOOGLE_PHOTO_URL}?maxwidth=400&maxheigth=800&photo_reference=${code}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
  return ImageSrc;
};

/** 자바 날짜 바꾸기 */
const convertToJSDate = (javaDate: string): Date => {
  const dateWithoutMicroseconds = javaDate.slice(0, 23);
  const date = new Date(dateWithoutMicroseconds);
  date.setHours(date.getHours() - 9);
  return date;
};

export const getTimeAgo = (javaDate: string): string => {
  const date = convertToJSDate(javaDate);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return `${seconds}초 전`;
};

/** 카테고리 한글화 */
export const categoryKO = (category: string) => {
  switch (category) {
    case 'communication':
      return '동향소통';
    case 'review':
      return '후기';
    case 'Life':
      return '생활정보';
    default:
      return category;
  }
};
