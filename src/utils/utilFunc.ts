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
