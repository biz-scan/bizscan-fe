import { useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { useLogin } from '@/hooks/mutations/useAuthMutations';
import type { LoginRequest } from '@/types/auth.type';

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginRequest>();
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginRequest) => {
    login(data, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.accessToken);
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl text-black font-bold">로그인</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-64 flex-col gap-4">
        <input
          {...register('email')}
          type="email"
          placeholder="이메일"
          className="rounded border border-amber-950 px-3 py-2"
        />
        <input
          {...register('password')}
          type="password"
          placeholder="비밀번호"
          className="rounded border border-amber-950 px-3 py-2"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </div>
  );
}
