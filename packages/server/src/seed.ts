import * as bcrypt from 'bcryptjs';
import { User } from './modules/user/user.entity';

const users = [
  {
    firstName: 'A',
    lastName: 'Lastname',
    email: 'a@a.se',
    password: '123456'
  },
  {
    firstName: 'B',
    lastName: 'Lastname',
    email: 'b@b.se',
    password: '123456'
  }
];

export async function insertUser() {
  const promises = users.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, 1);

    await User.create({
      ...user,
      password: hashedPassword
    }).save();
  });

  await Promise.all(promises);
}
