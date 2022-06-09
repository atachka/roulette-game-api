import { Injectable, NestMiddleware, Session, HttpException, HttpStatus } from "@nestjs/common";
import { Response, NextFunction } from "express";

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(@Session() session: Record<string, any>, res: Response, next: NextFunction) {
    if (!session.session.initialised) {
      throw new HttpException({ error: "Session Uninitialised" }, HttpStatus.FORBIDDEN);
    } else {
      next();
    }
  }
}
