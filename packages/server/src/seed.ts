import { User } from './entity/User';
import * as bcrypt from 'bcrypt';

export async function insertUser() {
  const hashedPassword = await bcrypt.hash('123456', 12);

  await User.create({
    firstName: 'Eric',
    lastName: 'Zakariasson',
    email: 'ez@mail.com',
    password: hashedPassword
  }).save();
}
