import { HttpException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat) private catModel: typeof Cat,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const createdCat = await this.catModel.create({
      name: createCatDto.name,
      owner: createCatDto.owner,
      age: createCatDto.age
    });
    return createdCat;
  }

  findAll() {
    return this.catModel.findAll();
  }

  async findOne(id: number) {
    const cat = await this.catModel.findOne({ where: { id: id } });

    console.log('cat consultado no banco', cat);

    if(!cat) {
      throw new HttpException('Cat nao encontrado meu caro', 404);
    }

    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.findOne(id);

    cat.set({
      name: updateCatDto.name,
      owner: updateCatDto.owner,
      age: updateCatDto.age
    });

    await cat.save();

    return cat;
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    await cat.destroy();
    return `This action removed a #${id} cat`;
  }
}
