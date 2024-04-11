import bcrypt from "bcrypt";
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(13);
  const hashedPassword = bcrypt.hash(password, salt);

  return hashedPassword;
};

export default hashPassword;
