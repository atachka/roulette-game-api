import { Injectable, NestMiddleware, Req, BadRequestException } from "@nestjs/common";
import { Response, NextFunction } from "express";
@Injectable()
export class BalanceMiddleware implements NestMiddleware {
  use(@Req() req: Record<string, any>, res: Response, next: NextFunction) {
    let sum = 0;
    for (let i = 0; i < req.body.betInfo.length; i++) {
      sum += req.body.betInfo[i].betAmount * 1;
    }
    if (sum > req.session.balance) {
      throw new BadRequestException({ error: "Insufficient Funds" });
    } else {
      next();
    }
  }
}
