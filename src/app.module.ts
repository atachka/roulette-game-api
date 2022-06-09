import { Module, CacheModule, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { SessionMiddleware } from "./middlewares/session.middleware";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { BalanceMiddleware } from "./middlewares/balance.middleware";
@Module({
  imports: [CacheModule.register(), ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware, BalanceMiddleware).forRoutes("spin");
    consumer.apply(AuthMiddleware).forRoutes("/create");
  }
}
