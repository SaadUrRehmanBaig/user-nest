import { Module, UseInterceptors } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: "mysql",
    host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todoServer',
      synchronize: true,
      dropSchema: true,
      autoLoadEntities: true,
  }), AuthModule],
})
export class AppModule {}
