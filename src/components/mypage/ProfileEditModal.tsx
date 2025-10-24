import { useState, useEffect, useRef } from 'react';
import { useUpdateUserProfile } from '@/hooks/useUser';
import { getPresignedUrls, uploadToS3 } from '@/api/s3Api';
import {
  ModalBackdrop,
  ModalBox,
  Input,
  Textarea,
  ButtonRow,
  ActionButton,
  ImageUploadBox,
  PreviewImage,
  FileInput,
} from '@/components/mypage/ProfileEditModal.style';
import defaultProfile from '@/assets/defaultProfile.png';
import type { UserProfile } from '@/types/User';

type Props = {
  profile: Partial<UserProfile>; 
  onClose: () => void;
};

const ProfileEditModal = ({ profile, onClose }: Props) => {
  const { mutate } = useUpdateUserProfile();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    nickname: profile.nickname ?? '',
    hobby: profile.hobby ?? '',
    introduction: profile.introduction ?? '',
    profileImage: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profile.profileImage || null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let uploadedImageUrl = profile.profileImage || null;

      if (formData.profileImage) {
        const presignedData = await getPresignedUrls('profiles', [formData.profileImage]);
        const { presignedUrl, fileUrl } = presignedData[0];
        await uploadToS3(presignedUrl, formData.profileImage);
        uploadedImageUrl = fileUrl;
      }

      mutate({
        nickname: formData.nickname,
        hobby: formData.hobby,
        introduction: formData.introduction,
        profileImage: uploadedImageUrl,
      });

      onClose();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : '이미지 업로드 중 오류가 발생했습니다.';
      console.error('이미지 업로드 실패:', error);
      alert(message);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <ModalBackdrop>
      <ModalBox>
        <h3>프로필 수정</h3>

        <ImageUploadBox onClick={handleBoxClick}>
          <FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
          <PreviewImage src={previewUrl || defaultProfile} alt="프로필 미리보기" />
        </ImageUploadBox>

        <Input name="nickname" value={formData.nickname} onChange={handleChange} placeholder="닉네임" />
        <Input name="hobby" value={formData.hobby} onChange={handleChange} placeholder="취미" />
        <Textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          placeholder="소개"
        />

        <ButtonRow>
          <ActionButton onClick={handleSubmit}>저장</ActionButton>
          <ActionButton $secondary onClick={onClose}>
            닫기
          </ActionButton>
        </ButtonRow>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default ProfileEditModal;
