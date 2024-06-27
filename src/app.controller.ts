import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AppService } from './app.service';
import authJwt from './helper/authJwt';
import { User } from './models/User';

@Controller()
export class AppController {
  constructor(
    @InjectModel(User) 
    private readonly user: typeof User,
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('auth/login')
  public async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<object> {
    const user = await this.user.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      token: await this.jwtService.signAsync({
        name: user.name,
        email: user.email,
        // Evite enviar a senha no token!
      }),
    };
  }

  @Get('products')
  @HttpCode(HttpStatus.OK)
  public async getProducts(
    @Query('name') name: string,
    @Headers('authorization') authorization: string,
  ) {
    authJwt({
      jwtService: this.jwtService,
      userService: this.user,
      authorization,
    });

    return this.appService.selectProduct(name);
  }

  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  public createProduct(
    @Body() body: any,
    @Headers('authorization') authorization: string,
  ): object {
    authJwt({
      jwtService: this.jwtService,
      userService: this.user,
      authorization,
    });

    this.appService.createProduct(body);
    return { message: 'Product created', body };
  }

  @Put('products')
  @HttpCode(HttpStatus.OK)
  public updateProduct(
    @Body() body: any,
    @Query('id') id: string,
    @Headers('authorization') authorization: string,
  ): object {
    authJwt({
      jwtService: this.jwtService,
      userService: this.user,
      authorization,
    });

    this.appService.updateProduct(body, id);
    return { message: 'Product updated', body };
  }

  @Delete('products')
  @HttpCode(HttpStatus.OK)
  public deleteProduct(
    @Query('id') id: string,
    @Headers('authorization') authorization: string,
  ): object {
    authJwt({
      jwtService: this.jwtService,
      userService: this.user,
      authorization,
    });

    this.appService.deleteProduct(id);
    return { message: 'Product deleted' };
  }
}

