'use client';

import {
  AccessContext,
  IAccessContext,
} from '@/components/providers/AccessContextProvider';
import React, { useContext, useEffect, useState } from 'react';
import {
  RegisterMemberSchema,
  UpdateEmailSchema,
  UpdatePasswordSchema,
  UpdateUsernameSchema,
} from '@/lib/schemas/updateAccountForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import TextInputField from '@/components/shared/TextInputField';
import { UpdateFields } from '@/lib/types';
import generateUpdateField from './generateUpdateField';
import { updateUser } from '@/app/(auth)/actions';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Input as vInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

const UpdateAccountForm = () => {
  const { userData } = useContext<IAccessContext>(AccessContext);
  const router = useRouter();
  const [isEditEmail, setIsEditEmail] = useState<boolean>(false);
  const [isEditUsername, setIsEditUsername] = useState<boolean>(false);
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);

  const registerMemberForm = useForm<vInput<typeof RegisterMemberSchema>>({
    resolver: valibotResolver(RegisterMemberSchema),
    defaultValues: {
      username: '',
      email: userData?.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  const updateUsernameForm = useForm<vInput<typeof UpdateUsernameSchema>>({
    resolver: valibotResolver(UpdateUsernameSchema),
    defaultValues: {
      username: '',
    },
  });

  const updateEmailForm = useForm<vInput<typeof UpdateEmailSchema>>({
    resolver: valibotResolver(UpdateEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const updatePasswordForm = useForm<vInput<typeof UpdatePasswordSchema>>({
    resolver: valibotResolver(UpdatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    updateEmailForm.reset({
      email: userData?.email || '',
    });
    updateUsernameForm.reset({
      username: userData?.username || '',
    });
    updatePasswordForm.reset({
      password: '',
      confirmPassword: '',
    });
    registerMemberForm.reset({
      email: userData?.email || '',
    });

    setIsEditUsername(!Boolean(userData?.username));
    setIsEditPassword(!Boolean(userData?.username));
  }, [
    updateEmailForm,
    updateUsernameForm,
    updatePasswordForm,
    registerMemberForm,
    userData,
  ]);

  const { mutateAsync: triggerUpdateUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      router.refresh();
      setIsEditEmail(false);
      setIsEditUsername(false);
      setIsEditPassword(false);
    },
  });

  const updateFields: UpdateFields[] = [
    {
      name: 'username',
      label: 'Username',
      schema: UpdateUsernameSchema,
      form: updateUsernameForm,
      isEdit: isEditUsername,
      setIsEdit: setIsEditUsername,
    },
    {
      name: 'email',
      label: 'Email',
      schema: UpdateEmailSchema,
      form: updateEmailForm,
      isEdit: isEditEmail,
      setIsEdit: setIsEditEmail,
    },
    {
      name: 'password',
      label: 'Password',
      schema: UpdatePasswordSchema,
      form: updatePasswordForm,
      isEdit: isEditPassword,
      setIsEdit: setIsEditPassword,
    },
  ];

  return (
    <div>
      {!userData?.username && (
        <div className='mb-4 bg-secondary p-2 border rounded-md'>
          <p>Please set your username and password first.</p>
        </div>
      )}
      {userData?.username ? (
        generateUpdateField(updateFields, userData?.role, triggerUpdateUser)
      ) : (
        <Form {...registerMemberForm}>
          <form
            onSubmit={registerMemberForm.handleSubmit((data) =>
              triggerUpdateUser(data)
            )}
            className='w-full'
          >
            <TextInputField
              control={registerMemberForm.control}
              name='username'
              label='Username'
              className='full grow'
            >
              <Input />
            </TextInputField>
            <TextInputField
              control={registerMemberForm.control}
              name='email'
              label='Email'
              className='full grow'
            >
              <Input disabled />
            </TextInputField>
            <TextInputField
              control={registerMemberForm.control}
              name='password'
              label='Password'
              className='full grow'
            >
              <Input type='password' />
            </TextInputField>
            <TextInputField
              control={registerMemberForm.control}
              name='confirmPassword'
              label='Confirm password'
              className='full grow'
            >
              <Input type='password' />
            </TextInputField>

            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UpdateAccountForm;
