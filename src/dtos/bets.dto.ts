import { IsEnum, IsNumber, ValidateIf, ValidateNested } from "class-validator";

enum BetType {
  even = "even",
  odd = "odd",
}

export class BetsDto {
  @IsNumber()
  betAmount: number;
  @ValidateIf((o) => {
    const allowed = ["odd", "even"];
    if (
      (typeof o.betType === "string" && !allowed.includes(o.betType)) ||
      (typeof o.betType === "number" && 0 > o.betType) ||
      o.betType > 36
    ) {
      return true;
    } else {
      return false;
    }
  })
  @IsEnum(BetType)
  @IsNumber()
  betType: BetType | number;
}
