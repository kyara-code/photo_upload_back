import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle("Photo App BackEnd")
    .setDescription("Photo App BackEnd - API")
    .setExternalDoc("Postman Collection", "/docs-json")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("app", "APIs in this sections are used to assess app health")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}