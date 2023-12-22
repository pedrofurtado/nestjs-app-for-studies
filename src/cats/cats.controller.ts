import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseFilters, ParseIntPipe, DefaultValuePipe, Query, BadRequestException, UseInterceptors, HttpException } from '@nestjs/common';
import { CatsInterceptor } from './cats.interceptor';
import { CatsExceptionFilter } from './cats.exception_filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
@UseFilters(new CatsExceptionFilter())
@UseInterceptors(CatsInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(
    @Query('catsFilter', new DefaultValuePipe('none_passed')) catsFilter: string
  ) {
    console.log('catsFilter', catsFilter);

    if(catsFilter == 'show_403_error') {
      throw new HttpException('Forbidden', 403);
    }

    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log('constructor is', id.constructor);
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: 405 })) id: string,
    @Body() updateCatDto: UpdateCatDto
  ) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
