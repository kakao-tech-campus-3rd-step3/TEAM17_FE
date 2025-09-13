import { z } from "zod";

export const step1Schema = z.object({
  name: z.string().min(2, "이름은 2글자 이상 입력해주세요."),
  birthDate: z.string().nonempty("생년월일을 입력해주세요."),
  gender: z.enum(["male", "female"]).refine((val) => val !== undefined, {
    message: "성별을 선택해주세요.",
  }),
  telephone: z
    .string()
    .regex(/^010\d{8}$/, "전화번호는 010으로 시작하는 11자리 숫자여야 합니다."),
});

export type Step1Values = z.infer<typeof step1Schema>;


export const step2Schema = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 최소 8자리 이상이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type Step2Values = z.infer<typeof step2Schema>;
