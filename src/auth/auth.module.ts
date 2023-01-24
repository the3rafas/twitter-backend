import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TwittesModule } from 'src/twittes/twittes.module';

@Module({
  imports: [
    UsersModule,
    TwittesModule,
    PassportModule,
    JwtModule.register({
      secret: 'hide-me',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthResolver, JwtStrategy],
})
export class AuthModule {}
