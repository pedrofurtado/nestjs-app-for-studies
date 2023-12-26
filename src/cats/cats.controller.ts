import { Controller, Render , Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseFilters, ParseIntPipe, DefaultValuePipe, Query, BadRequestException, UseInterceptors, HttpException, ParseArrayPipe, UseGuards } from '@nestjs/common';
import { CatsInterceptor } from './cats.interceptor';
import { CatsExceptionFilter } from './cats.exception_filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AuthGuard } from '../auth/auth.guard';
import { AuthzRolesGuard } from '../authz/authz.roles.guard';
import { AuthzRole } from '../authz/authz.role.enum';
import { AuthzRoles } from '../authz/authz.roles.decorator';

@Controller('cats')
@UseFilters(new CatsExceptionFilter())
@UseInterceptors(CatsInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly httpService: HttpService
  ) {}

  @Get('paginahtml')
  @Render('catsindex')
  pageHtml() {
    return { message: 'Hello world11!' };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Post('bulk')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createBulk(@Body(new ParseArrayPipe({ items: CreateCatDto })) createCatsDto: CreateCatDto[]) {
    let catsList = [];

    for (let i = 0; i < createCatsDto.length; i++) {
      let catDto = createCatsDto[i];
      catsList.push(await this.catsService.create(catDto));
    }

    return catsList;
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

  @Get('autenticado')
  @UseGuards(AuthGuard, AuthzRolesGuard)
  @AuthzRoles(AuthzRole.Guest, AuthzRole.Admin)
  catAutenticado(
  ) {
    return 'cat autenticado.';
  }

  @Get('cep')
  async findCep(
    @Query('cepCode', new DefaultValuePipe('none_passed')) cepCode: string
  ): Promise<any> {
    console.log('cepCode', cepCode);
    const { data } = await firstValueFrom(
      this.httpService.get(`https://viacep.com.br/ws/${cepCode}/json/`)
    );

    return data;
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
