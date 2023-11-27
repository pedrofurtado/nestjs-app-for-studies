import { HttpException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto);
    throw new HttpException('Forbidden', 403);
    return `This action adds a new cat ${JSON.stringify(createCatDto)}`;
  }

  findAll() {
    throw new HttpException('Forbidden', 403);
    return this.cats;
  }

  findOne(id: number) {
    throw new HttpException('Forbidden', 403);
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    throw new HttpException('Forbidden', 403);
    return `This action updates a #${id} cat ${JSON.stringify(updateCatDto)}`;
  }

  remove(id: number) {
    throw new HttpException('Forbidden', 403);
    return `This action removes a #${id} cat`;
  }
}
