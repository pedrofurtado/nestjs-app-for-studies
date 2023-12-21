import { Controller, Get, HttpCode, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/initial/:id')
  @HttpCode(200)
  getHello(
    @Req() req: Request,
    @Param() params: any
  ): string {
    return `${this.appService.getHello()} + ${JSON.stringify(req.query)} + ${JSON.stringify(params)}`;
  }

  @Get('/')
  @HttpCode(200)
  home(
    @Req() req: Request,
    @Param() params: any
  ): string {
    return `cats nestjs app - furtado`;
  }
}
