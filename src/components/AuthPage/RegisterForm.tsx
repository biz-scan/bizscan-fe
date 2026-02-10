import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from '@/components/ui/Label';
import { useSignup } from '@/hooks/auth';
import { type RegisterInput, registerSchema } from '@/schemas/auth.schema';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RegisterFormProps {
  handleTabChange?: () => void;
}

export default function RegisterForm({ handleTabChange }: RegisterFormProps) {
  const { mutate, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (_data: RegisterInput) => {
    mutate(_data);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-grey-darker mb-16">회원가입</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[514px]">
        <fieldset disabled={isPending} className="flex flex-col border-none disabled:opacity-60">
        <Label className="mb-2" htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          placeholder="이메일을 입력하세요."
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email && (
          <span className="text-error typo-p2-medium mt-2">{errors.email.message}</span>
        )}
        <Label className="mb-2 mt-4" htmlFor="nickname">
          닉네임
        </Label>
        <Input
          id="nickname"
          placeholder="닉네임을 입력하세요."
          aria-invalid={!!errors.nickname}
          {...register('nickname')}
        />
        {errors.nickname && (
          <span className="text-error typo-p2-medium mt-2">{errors.nickname.message}</span>
        )}
        <Label className="mb-2 mt-4" htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        {errors.password && (
          <span className="text-error typo-p2-medium mt-2">{errors.password.message}</span>
        )}
        <Label className="mb-2 mt-4" htmlFor="password">
          비밀번호 확인
        </Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="비밀번호를 확인하세요."
          aria-invalid={!!errors.passwordConfirm}
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && (
          <span className="text-error typo-p2-medium mt-2">{errors.passwordConfirm.message}</span>
        )}

        <Button variant="default" type="submit" className="w-full mt-10" disabled={isPending}>
          {isPending ? '가입 중...' : '가입하고 분석 시작하기'}
        </Button>

        <div className="flex justify-end mt-5">
          <p className="typo-p1-semibold text-grey-dark mr-2">이미 계정이 있으신가요?</p>
          <p
            className="typo-p1-semibold text-blue-normal  cursor-pointer "
            onClick={handleTabChange}
          >
            로그인하기
          </p>
        </div>
      </fieldset>
      </form>
    </div>
  );
}
