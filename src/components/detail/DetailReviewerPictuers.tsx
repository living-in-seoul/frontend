import Image from 'next/image';
import Link from 'next/link';

const DetailReviewerPictuers = ({
  photos = [],
}: {
  photos: Photo[] | undefined;
}) => {
  const newPhotos = photos
    .slice(0, 5)
    .map(
      (photo) =>
        `${process.env.NEXT_PUBLIC_GOOGLE_PHOTO_URL}?maxwidth=200&maxheigth=400&photo_reference=${photo.photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
    );

  return (
    <>
      {photos && (
        <div>
          <div>
            <div className=" font-semibold ">
              <div className="py-5 flex flex-row gap-3 ">
                <span className="">방문자 사진</span>
                <span className="text-zinc-600">{photos.length}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {newPhotos.map((photo, index) => (
                  <div key={index} className="w-full  h-auto bg-zinc-300">
                    <Image
                      className="w-full object-cover aspect-square"
                      alt={'Google Map Image'}
                      src={photo}
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
                {/* 누르면 리스트 페이지로 가야함 */}
                <Link href={'/'}>
                  <div className="flex items-center justify-center w-full  h-full bg-neutral-700">
                    <span className="text-white">{`+ ${
                      photos.length - 5
                    }`}</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailReviewerPictuers;
