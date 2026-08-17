export const RedisKey = {
  otp: (email: string) => `otp:${email}`,
};

export const RedisTTL = {
  OTP: 60,
};
