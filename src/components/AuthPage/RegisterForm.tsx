import { type SubmitHandler, useForm } from 'react-hook-form';

import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';

import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type Inputs = {
  email: string;
  password: string;
};

interface RegisterFormProps {
  handleTabChange?: () => void;
}
export default function RegisterForm({ handleTabChange }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-grey-darker mb-16">로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-[514px] flex flex-col">
        <Label className="mb-2" htmlFor="email">
          이메일
        </Label>
        <Input
          className="mb-4"
          id="email"
          placeholder="이메일을 입력하세요."
          {...register('email', { required: true })}
        />

        <Label className="mb-2 " htmlFor="password">
          비밀번호
        </Label>
        <Input
          className="mb-6"
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          {...register('password', { required: true })}
        />

        <div className="mb-8 flex items-center gap-2">
          <Checkbox variant="white" size="sm" id="remember-me" />
          <Label htmlFor="remember-me">로그인 상태 유지</Label>
        </div>
        {errors.password && <span>This field is required</span>}

        <Button variant="default" type="submit" className="w-full">
          로그인
        </Button>
        <div className="flex justify-end">
          <p
            className="typo-p1-semibold text-blue-normal mt-6 cursor-pointer"
            onClick={handleTabChange}
          >
            회원가입하기
          </p>
        </div>
      </form>
    </div>
  );
}
