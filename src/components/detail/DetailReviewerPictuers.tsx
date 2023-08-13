import Image from 'next/image';

const DetailReviewerPictuers = ({ photos }: { photos: Photo[] }) => {
  const newPhotos = photos.slice(0, 5);
  return (
    <div>
      <div>
        <div className=" font-semibold ">
          <div className="py-5 flex flex-row gap-3 ">
            <span className="">방문자 사진</span>
            <span className="text-zinc-600">105</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {newPhotos.map((photo) => (
              <div
                key={photo.html_attributions[0]}
                className="w-28 h-32 bg-zinc-300"
              >
                {/* <Image
                  alt={photo.photo_reference}
                  src={}
                  width={photo.width}
                  height={photo.height}
                /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReviewerPictuers;
