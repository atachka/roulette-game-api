import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as session from "express-session";
import Redis from "ioredis";
import { ValidationPipe } from "@nestjs/common";
const RedisStore = require("connect-redis")(session);

const redisClient = new Redis();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      cookie: { maxAge: 36000 },
    })
  );

  await app.listen(3000);
}
bootstrap();
