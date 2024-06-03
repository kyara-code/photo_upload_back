import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import BlobEntity from "./blob.entity";
import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Module({
    imports: [TypeOrmModule.forFeature([
        BlobEntity
    ])],
    controllers: [FileController],
    providers: [FileService],
    exports: [
        FileService
    ]
})

export class FileModule {}