import * as bcrypt from 'bcrypt';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User, UserRegisterInput } from '../../entity/User';
import { Context } from '../../types/context';

@Resolver(User)
export class UserResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('data')
    { firstName, lastName, email, password }: UserRegisterInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      }).save();

      ctx.req.session!.userId = user.id;

      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return null;
      }

      ctx.req.session!.userId = user.id;

      return user;
    } catch {
      return null;
    }
  }
}
