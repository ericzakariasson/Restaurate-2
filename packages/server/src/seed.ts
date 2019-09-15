import * as bcrypt from 'bcryptjs';
import { User } from './modules/user/user.entity';
import { getRepository } from 'typeorm';

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
  const userRepository = getRepository(User);

  const promises = users.map(async user => {
    const hashedPassword = await bcrypt.hash(user.password, 1);

    const created = userRepository.create({
      ...user,
      password: hashedPassword
    });

    await userRepository.save(created);
  });

  await Promise.all(promises);
}
