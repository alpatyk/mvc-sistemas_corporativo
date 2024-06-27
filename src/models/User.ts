import {
    AutoIncrement,
    Column,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
  
  @Table
  export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
  
    @Column
    name: string;
  
    @Column
    email: string;
  
    @Column
    password: string;
  
    @Column
    document: string;
  
    @Column
    phone: string;
  
    @Column
    address: string;
  }
  