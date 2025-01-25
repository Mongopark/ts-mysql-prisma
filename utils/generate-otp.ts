export function generateOtp() {
  const otpcode = `${Math.floor(100000 + Math.random() * 900000)}`;
  return otpcode;
}

export function generateLoginCode() {
  const code = `${Math.floor(100 * Math.random() * 9000)}`;
  return code;
}
