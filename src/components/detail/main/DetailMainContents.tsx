import Image from 'next/image';

const DetailMainContents = ({ data }: { data: ResponseDetailData }) => {
  return (
    <div>
      <div className=" flex flex-col gap-4  ">
        <div className="overflow-auto">
          {data.result.post.content}
          {/* 영어 길게 썼을 때 한문자 취급 되는데 그거 고쳐야지 */}
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
