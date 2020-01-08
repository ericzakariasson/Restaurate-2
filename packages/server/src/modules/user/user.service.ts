import * as bcrypt from 'bcryptjs';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SessionRequest } from '../../graphql/types';
import { redis } from '../../services/redis/redis';
import { logger, sendEmail } from '../../utils';
import { Place } from '../place/place.entity';
import { Visit } from '../visit/visit.entity';
import { User } from './user.entity';
import { createConfirmationUrl } from './user.helper';
import { UserRegisterInput } from './user.types';

export class UserNotConfirmedError {}
export class UserPasswordIsNotValid {}
export class UserNotFound {}

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
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async login(email: string, password: string, req: SessionRequest) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UserNotFound();
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UserPasswordIsNotValid();
    }

    if (!user.confirmed) {
      throw new UserNotConfirmedError();
    }

    req.session.userId = user.id;

    logger.info('User login', { user: user.id });

    return user;
  }

  async confirmUser(token: string, req: SessionRequest) {
    const userId = await redis.get(token);

    if (!userId) {
      return false;
    }

    await this.userRepository.update(userId, { confirmed: true });
    await redis.del(token);

    req.session.userId = Number(userId);

    logger.info('User confirmed', { user: userId });

    return true;
  }

  async register(input: UserRegisterInput, req: SessionRequest) {
    const hashedPassword = await bcrypt.hash(input.password, 12);

    const user = this.userRepository.create({
      ...input,
      password: hashedPassword
    });

    await this.userRepository.save(user);

    req.session.userId = user.id;

    logger.info('User register', { user: user.id });

    this.sendConfirmationEmail(user);

    return user;
  }

  async sendConfirmationEmail(user: User) {
    const confirmUserUrl = await createConfirmationUrl(user.id);

    await sendEmail({
      from: 'Restaurate <hej@restaurate.se>',
      to: user.email,
      template: 'confirmUser',
      data: {
        confirm_user_url: confirmUserUrl,
        first_name: user.firstName
      }
    });

    return true;
  }

  async logout(req: SessionRequest): Promise<boolean> {
    return new Promise((resolve, reject) => {
      return req.session.destroy(err => {
        if (err) {
          logger.error('Could not destroy session', err);
          return reject(false);
        }

        logger.info('User logout');
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

  async getUserPlaceCount(userId: number) {
    return this.placeRepository.count({ where: { userId } });
  }

  async getUserVisitCount(userId: number) {
    return this.visitRepository.count({ where: { userId } });
  }
}
