import { Injectable, NestMiddleware, HttpException, HttpStatus, Req } from "@nestjs/common";
import { Response, NextFunction } from "express";
import jwt_decode from "jwt-decode";
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(@Req() req: Record<string, any>, res: Response, next: NextFunction) {
    try {
      const decoded = jwt_decode(req.headers.authorization);
      req.startingBalance = decoded;
      next();
    } catch (err) {
      throw new HttpException({ error: "Invalid Token" }, HttpStatus.UNAUTHORIZED);
    }
  }
}
