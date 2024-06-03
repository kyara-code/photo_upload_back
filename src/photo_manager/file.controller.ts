import { Controller, ForbiddenException, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import { DeepPartial } from "typeorm";
import { BlobDTO } from "./blob.dto";
import BlobEntity from "./blob.entity";
import { FileService } from "./file.service";

@ApiTags('file')
@Controller('file')
export class FileController {
    constructor(private fileService: FileService) {}

    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
        type: "object",
        properties: {
            file: {
            type: "string",
            format: "binary",
            },
        },
        },
    })
    @ApiResponse({
        status: 201,
        type: BlobDTO,
    })
    @Post()
    @UseInterceptors(FileInterceptor("file"))
    upload_file(
        @UploadedFile() file: Express.Multer.File
    ) {
        if (!file.mimetype.startsWith("image")) {
        throw new ForbiddenException(
            `Il file caricato non è un'immagine. Riprovare.`
        );
        }

        const newBlob: DeepPartial<BlobEntity> = {
        mime: file.mimetype,
        value: randomUUID() + "." + file.originalname.split(".").pop(),
        name: file.originalname,
        };

        return this.fileService.uploadFile(newBlob, file);
  }
}