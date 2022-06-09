import { Controller, Delete, Post, Req, Body, ParseArrayPipe } from "@nestjs/common";
import { AppService } from "./app.service";
import { BetsDto } from "./dtos/bets.dto";
import { SpinResult } from "./dtos/spinResult.dto";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/create")
  create(@Req() req: Record<string, any>) {
    return this.appService.create(req);
  }

  @Post("/spin")
  spin(@Req() req, @Body("betInfo", new ParseArrayPipe({ items: BetsDto })) betInfo: BetsDto[]): SpinResult {
    const result = this.appService.spin(betInfo);
    const startingBalance = req.session.balance;
    req.session.balance += result.balance;
    result.balance += startingBalance;
    return result;
  }
  @Delete("/end")
  end(@Req() req: Record<string, any>): string {
    req.session.destroy();
    return "session stopped";
  }
}
