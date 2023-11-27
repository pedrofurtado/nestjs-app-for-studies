import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsInt()
  @IsNotEmpty()
  age: number;
}
