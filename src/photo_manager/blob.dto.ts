import { ApiProperty } from "@nestjs/swagger";

export class BlobDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mime: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}

export class BlobCreateDTO {
  @ApiProperty()
  mime: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  name: string;
}