import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/Product';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product)
    private product: typeof Product,
    private readonly jwtService: JwtService,
  ) {}

  public async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  public async selectProduct(name: string) {
    return name
      ? this.product.findAll({
          where: {
            name,
          },
        })
      : this.product.findAll();
  }

  public createProduct(body: any) {
    this.product.create(body);
  }

  public updateProduct(body: any, id: string) {
    this.product.update(body, {
      where: {
        id,
      },
    });
  }

  public deleteProduct(id: string) {
    this.product.destroy({
      where: {
        id,
      },
    });
  }
}
