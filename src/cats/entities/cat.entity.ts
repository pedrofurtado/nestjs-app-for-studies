import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  underscored: true,
})
export class Cat extends Model {
  @Column
  name: string;

  @Column
  owner: string;

  @Column
  age: number;
}
