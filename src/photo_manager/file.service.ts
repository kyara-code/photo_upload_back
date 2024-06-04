import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import BlobEntity from "./blob.entity";
import { BlobCreateDTO, BlobDTO } from "./blob.dto";
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

  async downloadFile(id: string): Promise<any> {
    const blob: BlobEntity = await this.blobRepository.findOne({
      where: { id }
    })

    const blobDTO = {
      id: blob.id,
      mime: blob.mime,
      url: configuration.BASE_IMG_URL + blob.value,
      name: blob.name
    }

    return blobDTO
  }

  async downloadAllFiles(): Promise<any[]> {
    const blobs: BlobEntity[] = await this.blobRepository.find({})

    if (blobs.length === 0) {
      return [];
    }

    return blobs.map((blob) => ({
      id: blob.id,
      mime: blob.mime,
      url: configuration.BASE_IMG_URL + blob.value,
      name: blob.name
    }));
  }

  async deleteFile(id: string) {
    const blob: BlobEntity = await this.blobRepository.findOne({
      where: { id },
    });

    return blob.softRemove();
  }
}