import * as bcrypt from 'bcrypt';
import { User } from '../../entity/User/User';
import { Mutation, Arg, Ctx, Resolver } from 'type-graphql';
import { Context } from '../../types/graphql-utils';

@Resolver(User)
export class LoginResolver {
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
