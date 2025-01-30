import { z } from 'zod';

export const emailSchema = z
  .string({
    message: 'Please provide a valid email address'
  })
  .trim()
  .email('Please provide a valid email address')
  .min(1)
  .max(255)
  .transform((arg) => arg.toLowerCase());

export const passwordSchema = z
  .string({
    message: 'Please provide your password'
  })
  .trim()
  .min(4, 'Please provide password with minimum 4 characters');

const registerSchema = z.object({
  name: z
    .string({
      message: 'Please provide your name'
    })
    .trim()
    .min(1, 'Please provide your name')
    .max(255),
  email: emailSchema,
  password: passwordSchema
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const userSchema = {
  register: registerSchema,
  login: loginSchema
};
