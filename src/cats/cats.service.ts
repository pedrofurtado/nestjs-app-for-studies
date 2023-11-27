import { HttpException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  create(createCatDto: CreateCatDto) {
    let cat = this.cats.filter(cat => cat['id'] == createCatDto.id)

    if(!cat[0]) {
      this.cats.push(createCatDto);
    }

    return `This action adds a new cat ${createCatDto}`;
  }

  findAll() {
    //throw new HttpException('Forbidden', 403);
    return this.cats;
  }

  findOne(id: number) {
    let cat = this.cats.filter(cat => cat['id'] == id)[0]

    if(!cat) {
      throw new HttpException(`Nao encontrado cat #${id}`, 412)
    }

    return cat;
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
