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
}
