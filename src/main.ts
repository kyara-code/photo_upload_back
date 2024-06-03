import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import setupSwagger from "./util/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverPort = process.env.SERVER_PORT || 3000;
  app.enableCors({ origin: process.env.CORS_DOMAIN || "*" });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, forbidUnknownValues: false })
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  setupSwagger(app);

  await app.listen(serverPort, "0.0.0.0");
}
bootstrap();
