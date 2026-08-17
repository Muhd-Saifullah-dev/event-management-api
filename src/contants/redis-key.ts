export const RedisKey = {
  otp: (email: string) => `otp:${email}`,
  passwordReset: (email: string) => `password-reset:${email}`,
};

export const RedisTTL = {
  OTP: 60,
  PASSWORD_RESET: 10 * 60,
};
