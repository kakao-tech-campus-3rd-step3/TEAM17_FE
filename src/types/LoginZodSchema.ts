import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(8, "비밀번호는 최소 8자리 이상이어야 합니다."),
});

export type LoginValues = z.infer<typeof loginSchema>;