import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CatsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('middleawer Request of cats...');
    next();
  }
}
