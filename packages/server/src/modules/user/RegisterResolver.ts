import * as bcrypt from 'bcrypt';
import { User, UserRegisterInput } from '../../entity/User';
import { Mutation, Arg, Ctx, Resolver } from 'type-graphql';
import { Context } from 'src/types/graphql-utils';

@Resolver(User)
export class RegisterResolver {
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
