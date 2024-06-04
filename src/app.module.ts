import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './photo_manager/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      autoLoadEntities: true,
      synchronize: true,
      ...configuration.database
    }),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
