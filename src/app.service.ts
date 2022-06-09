import { Injectable } from "@nestjs/common";
import { SpinResult } from "./dtos/spinResult.dto";

@Injectable()
export class AppService {
  create(req): string {
    req.session.initialised = true;
    req.session.balance = req.startingBalance.balance;
    return "Session Created";
  }
  checkIfWon(winningNumber: number, bet): number {
    if (bet.betType === "odd" && winningNumber % 2 === 1) {
      return 2;
    } else if (bet.betType === "even" && winningNumber % 2 === 0) {
      return 2;
    } else if (bet.betType === winningNumber) {
      return 36;
    } else {
      return -1;
    }
  }
  spin(betInfo): SpinResult {
    let balance = 0;
    let wonBets = [];
    const winningNumber = Math.floor(Math.random() * (36 - 0 + 1) + 0);
    for (let i = 0; i < betInfo.length; i++) {
      const result = this.checkIfWon(winningNumber, betInfo[i]);
      if (result > 0) {
        balance += betInfo[i].betAmount * result;
        wonBets.push(betInfo[i]);
      } else {
        balance -= betInfo[i].betAmount;
      }
    }
    return { wonBets, balance };
  }
}
