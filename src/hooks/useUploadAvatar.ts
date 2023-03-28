import React, { useCallback } from 'react';

import { useUpdateUserMutation, useUploadFileMutation } from '../store';
import { Nullable, User } from '../types';

type UseUploadNewAvatarArgs = {
  user: Nullable<User>;
};

export const useUploadAvatar = ({ user }: UseUploadNewAvatarArgs) => {
  const [
    uploadNewAvatar,
    { isLoading: isLoadingAvatarUploading, isError: isErrorAvatarUploading, isSuccess: isSuccessAvatarUploading },
  ] = useUploadFileMutation();
  const [
    updateUser,
    { isLoading: isLoadingUserUpdating, isError: isErrorUserUpdating, isSuccess: isSuccessUserUpdating },
  ] = useUpdateUserMutation();

  const handleChange = useCallback(
    async (e: React.ChangeEvent) => {
      const target = e.target as HTMLInputElement;

      if (target.files && target.files[0] && user) {
        const file = target.files[0];

        try {
          const arrayBuffer = await file.arrayBuffer();
          const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
          const formData = new FormData();

          formData.set('files', blob);

          const [{ id }] = await uploadNewAvatar(formData).unwrap();

          await updateUser({ avatar: id, userId: user.id }).unwrap();
        } catch (err) {
          console.error('Error with avatar uploading! ', err);
        }
      }
    },
    [updateUser, uploadNewAvatar, user]
  );

  return {
    handleChange,
    status: {
      isLoading: isLoadingAvatarUploading || isLoadingUserUpdating,
      isError: isErrorAvatarUploading || isErrorUserUpdating,
      isSuccess: isSuccessAvatarUploading && isSuccessUserUpdating,
    },
  };
};
