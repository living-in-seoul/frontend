import Image from 'next/image';
import Button from '../common/Category';
import Icons from '../common/Icons';

interface PostItemProps extends ResponsePost {
  selectCategory: string | null;
}
const comment = {
  path: 'M7 12.4457C8.03835 12.4457 9.05339 12.1378 9.91674 11.5609C10.7801 10.984 11.453 10.1641 11.8504 9.20477C12.2477 8.24546 12.3517 7.18986 12.1491 6.17146C11.9466 5.15306 11.4465 4.2176 10.7123 3.48337C9.97809 2.74914 9.04262 2.24913 8.02422 2.04656C7.00582 1.84399 5.95022 1.94795 4.99091 2.34531C4.0316 2.74267 3.21166 3.41558 2.63478 4.27894C2.05791 5.1423 1.75 6.15733 1.75 7.19568C1.75 8.06368 1.96 8.88152 2.33333 9.6031L1.75 12.4457L4.59258 11.8623C5.31358 12.2351 6.13258 12.4457 7 12.4457Z',
  width: 14,
  height: 15,
};

const heart = {
  path: 'M9.73438 1.94568C8.60508 1.94568 7.61633 2.4313 7 3.25216C6.38367 2.4313 5.39492 1.94568 4.26562 1.94568C3.36669 1.94669 2.50486 2.30424 1.86921 2.93989C1.23356 3.57553 0.876013 4.43737 0.875 5.3363C0.875 9.16443 6.55102 12.263 6.79273 12.391C6.85644 12.4253 6.92766 12.4432 7 12.4432C7.07234 12.4432 7.14356 12.4253 7.20727 12.391C7.44898 12.263 13.125 9.16443 13.125 5.3363C13.124 4.43737 12.7664 3.57553 12.1308 2.93989C11.4951 2.30424 10.6333 1.94669 9.73438 1.94568ZM7 11.5051C6.00141 10.9232 1.75 8.27248 1.75 5.3363C1.75087 4.66938 2.01619 4.03003 2.48777 3.55845C2.95935 3.08686 3.59871 2.82155 4.26562 2.82068C5.3293 2.82068 6.22234 3.38724 6.59531 4.29724C6.62827 4.37748 6.68435 4.44612 6.7564 4.49442C6.82846 4.54272 6.91325 4.56851 7 4.56851C7.08675 4.56851 7.17154 4.54272 7.2436 4.49442C7.31565 4.44612 7.37173 4.37748 7.40469 4.29724C7.77766 3.3856 8.6707 2.82068 9.73438 2.82068C10.4013 2.82155 11.0406 3.08686 11.5122 3.55845C11.9838 4.03003 12.2491 4.66938 12.25 5.3363C12.25 8.2681 7.9975 10.9226 7 11.5051Z',
  width: 14,
  height: 15,
};

const share = {
  path: 'M10.7063 9.52907C10.4444 9.53007 10.1854 9.58397 9.9448 9.68756C9.70422 9.79114 9.48705 9.94226 9.30632 10.1318L4.56577 7.75962C4.68238 7.40603 4.68238 7.02433 4.56577 6.67073L9.3141 4.25573C9.65421 4.61414 10.1154 4.83329 10.6081 4.87059C11.1008 4.90788 11.5898 4.76066 11.98 4.45752C12.3702 4.15439 12.6337 3.71701 12.7194 3.2304C12.805 2.74378 12.7067 2.24269 12.4435 1.82453C12.1803 1.40636 11.7711 1.101 11.2952 0.96778C10.8194 0.834563 10.3111 0.883014 9.86904 1.10372C9.42697 1.32442 9.08275 1.7016 8.90329 2.16196C8.72382 2.62231 8.72193 3.13295 8.89799 3.59462L4.19632 5.98629C3.9424 5.67574 3.59864 5.45133 3.21217 5.34382C2.8257 5.2363 2.41543 5.25095 2.03761 5.38575C1.65979 5.52056 1.33291 5.76891 1.10178 6.09678C0.870651 6.42465 0.746582 6.81598 0.746582 7.21712C0.746582 7.61827 0.870651 8.0096 1.10178 8.33746C1.33291 8.66533 1.65979 8.91369 2.03761 9.04849C2.41543 9.18329 2.8257 9.19794 3.21217 9.09043C3.59864 8.98292 3.9424 8.7585 4.19632 8.44796L8.88632 10.8085C8.80708 11.0213 8.76626 11.2465 8.76577 11.4735C8.76577 11.8581 8.87981 12.234 9.09346 12.5538C9.30712 12.8735 9.6108 13.1228 9.9661 13.2699C10.3214 13.4171 10.7124 13.4556 11.0896 13.3806C11.4667 13.3056 11.8132 13.1204 12.0851 12.8484C12.3571 12.5765 12.5423 12.23 12.6173 11.8529C12.6923 11.4757 12.6538 11.0847 12.5066 10.7294C12.3595 10.3741 12.1102 10.0704 11.7905 9.85676C11.4707 9.64311 11.0948 9.52907 10.7102 9.52907H10.7063ZM10.7063 1.75129C10.9371 1.75129 11.1626 1.81971 11.3545 1.94791C11.5463 2.0761 11.6959 2.25831 11.7842 2.47149C11.8725 2.68467 11.8956 2.91925 11.8506 3.14556C11.8056 3.37187 11.6944 3.57975 11.5313 3.74291C11.3681 3.90607 11.1602 4.01719 10.9339 4.0622C10.7076 4.10722 10.473 4.08412 10.2599 3.99581C10.0467 3.90751 9.86447 3.75798 9.73627 3.56612C9.60808 3.37426 9.53966 3.1487 9.53966 2.91795C9.53966 2.60854 9.66257 2.31179 9.88136 2.093C10.1002 1.8742 10.3969 1.75129 10.7063 1.75129ZM2.72243 8.3624C2.49169 8.3624 2.26612 8.29398 2.07427 8.16578C1.88241 8.03759 1.73288 7.85538 1.64457 7.6422C1.55627 7.42902 1.53317 7.19444 1.57818 6.96813C1.6232 6.74182 1.73431 6.53394 1.89748 6.37078C2.06064 6.20761 2.26852 6.0965 2.49483 6.05148C2.72114 6.00647 2.95572 6.02957 3.1689 6.11787C3.38208 6.20618 3.56429 6.35571 3.69248 6.54757C3.82068 6.73943 3.8891 6.96499 3.8891 7.19573C3.8891 7.50515 3.76618 7.8019 3.54739 8.02069C3.3286 8.23948 3.03185 8.3624 2.72243 8.3624ZM10.7063 12.6402C10.4756 12.6402 10.25 12.5718 10.0582 12.4436C9.8663 12.3154 9.71677 12.1332 9.62846 11.92C9.54016 11.7068 9.51706 11.4722 9.56207 11.2459C9.60709 11.0196 9.7182 10.8117 9.88136 10.6486C10.0445 10.4854 10.2524 10.3743 10.4787 10.3293C10.705 10.2842 10.9396 10.3073 11.1528 10.3957C11.366 10.484 11.5482 10.6335 11.6764 10.8253C11.8046 11.0172 11.873 11.2428 11.873 11.4735C11.873 11.7829 11.7501 12.0797 11.5313 12.2985C11.3125 12.5173 11.0157 12.6402 10.7063 12.6402Z',
  width: 14,
  height: 15,
};

const PostItem = ({ board, user, selectCategory }: PostItemProps) => {
  const { content } = board;
  const { nickname, profileImg } = user;
  return (
    <article className="flex border-b last:border-[0]">
      <div className="flex w-full p-4">
        <div className="relative shrink-0 w-[55px] h-[55px] rounded-full overflow-hidden">
          <Image
            src={profileImg}
            alt={`user`}
            fill
            className="absolute top-0"
          />
        </div>

        <div className="grow px-4">
          <Button title={`#${selectCategory}`} disable />
          <h3 className="text-xs font-[600] my-1">{nickname}</h3>
          <p className="text-xs">{content}</p>
          <div className="flex justify-between w-1/2 py-1">
            <Icons path={comment} />
            <Icons path={heart} />
            <Icons path={share} />
          </div>
        </div>
      </div>
    </article>
  );
};
export default PostItem;
