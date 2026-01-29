import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { type LoginInput, loginSchema } from '@/schemas/auth.schema';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface LoginFormProps {
  handleTabChange?: () => void;
}

export default function LoginForm({ handleTabChange }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (_data: LoginInput) => {
    // TODO: 로그인 API 호출
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-grey-darker mb-16">로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[514px] flex flex-col">
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

        <div className="mt-6 mb-8 flex items-center gap-2">
          <Checkbox variant="white" size="sm" id="remember-me" />
          <Label htmlFor="remember-me">로그인 상태 유지</Label>
        </div>

        <Button variant="default" type="submit" className="w-full">
          로그인
        </Button>

        <p
          className="typo-p1-semibold text-blue-normal mt-6 cursor-pointer text-end"
          onClick={handleTabChange}
        >
          회원가입하기
        </p>
      </form>
    </div>
  );
}
