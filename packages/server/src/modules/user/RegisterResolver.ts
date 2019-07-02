import * as bcrypt from 'bcrypt';
import { User } from '../../entity/User/User';
import { UserRegisterInput } from '../../entity/User/UserRegisterInput';
import { Mutation, Arg, Ctx, Resolver } from 'type-graphql';
import { Context } from 'src/types/graphql-utils';

@Resolver(User)
export class RegisterResolver {
  @Mutation(() => User, { nullable: true })
  async register(
    @Arg('data')
    { firstName, lastName, email, password }: UserRegisterInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      }).save();

      ctx.req.session!.userId = user.id;

      return user;
    } catch {
      return null;
    }
  }
}
