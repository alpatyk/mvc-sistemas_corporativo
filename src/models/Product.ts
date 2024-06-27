import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
  
  @Table
  export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    name: string;
  
    @Column
    description: string;
  
    @Column
    company: string;
  
    @Column
    price: number;
  
    @Column
    amount: number;
  }
  