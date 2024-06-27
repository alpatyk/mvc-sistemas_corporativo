import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './models/Product';
import { User } from './models/User';

@Module({
  imports: [
    JwtModule.register({
      secret: 'MySecresstKey',
      signOptions: { expiresIn: '1000s' },
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306, // 3306 para o banco rodando local, mas 3307 para o banco rodando no docker
      username: 'root',
      password: 'positivo', // tem que ser a senha definida para o seu banco de dados
      database: 'generaldbs',
      models: [Product, User],
    }),
    SequelizeModule.forFeature([Product, User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}