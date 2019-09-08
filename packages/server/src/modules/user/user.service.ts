import { Repository } from 'typeorm';
import { Service } from 'typedi';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from './user.entity';
import { Request } from 'express';
import { UserRegisterInput } from './user.types';
import { Place } from '../place/place.entity';
import { Visit } from '../visit/visit.entity';

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>
  ) {}

  async findById(id: number) {
    if (!id) {
      throw new Error('No user id provided');
    }

    return this.userRepository.findOne(id);
  }

  async login(email: string, password: string, req: Request) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    req.session!.userId = user.id;

    return user;
  }

  async register(input: UserRegisterInput, req: Request) {
    const hashedPassword = await bcrypt.hash(input.password, 12);

    const user = this.userRepository.create({
      ...input,
      password: hashedPassword
    });

    await this.userRepository.save(user);

    req.session!.userId = user.id;

    return user;
  }

  async logout(req: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return req.session!.destroy(err => {
        if (err) {
          console.error(err);
          return reject(false);
        }

        resolve(true);
      });
    });
  }

  async getMe(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async getUserPlaces(userId: number) {
    return this.placeRepository.find({ where: { userId } });
  }

  async getUserVisits(userId: number) {
    return this.visitRepository.find({ where: { userId } });
  }

  async getUserPlaceCount(userId: number) {
    return this.placeRepository.count({ where: { userId } });
  }

  async getUserVisitCount(userId: number) {
    return this.visitRepository.count({ where: { userId } });
  }
}
