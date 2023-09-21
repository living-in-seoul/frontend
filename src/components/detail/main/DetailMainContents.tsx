import Image from 'next/image';

const DetailMainContents = ({ data }: { data: ResponseDetailData }) => {
  return (
    <div>
      <div className=" flex flex-col gap-4  ">
        <div className="overflow-auto break-words whitespace-pre-wrap">
          {data.result.post.content}
        </div>
        {data.result.post.postImg &&
          data.result.post.postImg.map((img, index) => (
            <Image
              key={index}
              src={img.postImg}
              alt={img.id.toString()}
              width={400}
              height={200}
              className="rounded-lg"
              priority={true}
            />
          ))}
      </div>
    </div>
  );
};

export default DetailMainContents;
