import * as bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

export class SecurityUtils {
  public static async encryptString(text: string): Promise<string> {
    let hashStr = '';
    hashStr = await bcrypt.hash(text, SALT_WORK_FACTOR);
    return hashStr;
  }

  public static async compareString(
    plain: string,
    encrypted: string
  ): Promise<boolean> {
    let result = false;
    return bcrypt.compare(plain, encrypted);
  }
}
