import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import BlobEntity from "./blob.entity";
import { BlobCreateDTO } from "./blob.dto";
import * as fs from "fs";
import * as path from "path";
import configuration from "../config/configuration";
import validator from "validator";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(BlobEntity)
    private blobRepository: Repository<BlobEntity>
  ) {}

  async uploadFile(newBlob: DeepPartial<BlobCreateDTO>, file: Express.Multer.File) {
    const sanitizedBlobValue = validator.escape(newBlob.value);
    // semgrep-ignore
    fs.writeFileSync(
      path.join(configuration.UPLOAD_DIR, sanitizedBlobValue),
      file.buffer
    );

    const blob: BlobEntity = this.blobRepository.create(newBlob);

    await blob.save();

    return blob;
  }
}