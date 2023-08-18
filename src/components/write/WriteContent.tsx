'use client';
import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useCallback,
  useState,
} from 'react';

type WriteFormTypes = Omit<RequestBoardWrite, 'postImg'>;

const WriteContent = () => {
  const [formData, setFormData] = useState<WriteFormTypes>({
    category: '',
    title: '',
    locationTag: [],
    purposeTag: [],
    content: '',
  });
  const [locationText, setlocationText] = useState<string>('');
  const [purposeText, setpurposeText] = useState<string>('');
  const [postImg, setPostImg] = useState<File | null>(null);

  const onChangeHandler = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeTag = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    name === 'loc'
      ? setlocationText(e.target.value)
      : setpurposeText(e.target.value);
  };

  const onAddTag = useCallback(
    (e: MouseEvent, name: string) => {
      e.preventDefault();
      if (name === 'loc') {
        setFormData((prev) => ({
          ...prev,
          locationTag: [...prev.locationTag, locationText],
        }));
        setlocationText('');
      } else {
        setFormData((prev) => ({
          ...prev,
          purposeTag: [...prev.purposeTag, purposeText],
        }));
        setpurposeText('');
      }
    },
    [locationText, purposeText],
  );

  const onAddPostImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //일단 한 장만
      setPostImg(e.target.files[0]);
    }
  };

  const onDeleteTag = useCallback((tag: string, name: string) => {
    if (name === 'loc') {
      setFormData((prev) => ({
        ...prev,
        locationTag: prev.locationTag.filter((t) => t !== tag),
      }));
      setlocationText('');
    } else {
      setFormData((prev) => ({
        ...prev,
        purposeTag: prev.purposeTag.filter((t) => t !== tag),
      }));
      setpurposeText('');
    }
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData();
      const post = {
        title: formData.title,
        content: formData.content,
        locationTag: '#' + formData.locationTag.join('#'),
        purposeTag: '#' + formData.purposeTag.join('#'),
      };
      data.append(
        'post',
        new Blob([JSON.stringify(post)], { type: 'application/json' }),
      );

      //category, location 추가해라
      if (postImg) {
        data.append('photos', postImg);
      }
      const response = await fetch('/api/write', {
        method: 'POST',
        body: data,
      });
      console.log(await response.json());
    },
    [formData, postImg],
  );

  return (
    <form
      // action={submitForm}
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="flex flex-col gap-2 w-4/5 p-10 bg-neutral-200 mx-auto my-5 "
    >
      <select name="category" onChange={(e) => onChangeHandler(e)}>
        <option value="전체">전체</option>
        <option value="후기">후기</option>
        <option value="동향소통">동향소통</option>
        <option value="생활정보">생활정보</option>
      </select>
      <input
        name="title"
        placeholder="제목"
        value={formData.title}
        onChange={(e) => onChangeHandler(e)}
      />
      <textarea
        name="content"
        placeholder="내용"
        rows={5}
        value={formData.content}
        onChange={(e) => onChangeHandler(e)}
      />
      <input name="postImg" type="file" onChange={(e) => onAddPostImg(e)} />
      <div className="flex ">
        <input
          name="locationTag"
          value={locationText}
          onChange={(e) => onChangeTag(e, 'loc')}
          placeholder="장소 태그"
        />
        <button name="locationTagButton" onClick={(e) => onAddTag(e, 'loc')}>
          추가
        </button>
      </div>
      <div>
        {formData.locationTag.map((tag, _) => (
          <div key={tag} onClick={() => onDeleteTag(tag, 'loc')}>
            #{tag}
          </div>
        ))}
      </div>
      <div className="flex ">
        <input
          name="purposeTag"
          value={purposeText}
          onChange={(e) => onChangeTag(e, 'pur')}
          placeholder="목적 태그"
        />
        <button name="purposeTagButton" onClick={(e) => onAddTag(e, 'pur')}>
          추가
        </button>
      </div>
      {formData.purposeTag.map((tag, _) => (
        <span key={tag} onClick={() => onDeleteTag(tag, 'pur')}>
          #{tag}
        </span>
      ))}
      <button type="submit">글 작성</button>
    </form>
  );
};

export default WriteContent;
