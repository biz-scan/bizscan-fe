import { z } from 'zod';

// 공통 스키마
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요.')
  .email('올바른 이메일 형식이 아닙니다.');

export const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해주세요.')
  .max(10, '닉네임은 10자 이하로 입력해주세요.')
  .regex(/^[가-힣a-zA-Z0-9\s]+$/, '한글, 영문, 숫자만 입력 가능합니다.');

export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다.')
  .max(16, '비밀번호는 16자 이하로 입력해주세요.')
  .regex(/(?=.*[a-zA-Z])(?=.*\d)/, '영문, 숫자를 조합하여 입력해주세요.');

// 로그인 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;

// 회원가입 스키마
export const registerSchema = z
  .object({
    nickname: nicknameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
