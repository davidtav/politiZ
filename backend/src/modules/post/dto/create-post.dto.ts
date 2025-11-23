import { IsNotEmpty, IsOptional, IsString, ValidateNested, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePollDto } from './create-poll.dto';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  channelId!: string;

  @IsOptional()
  @IsString()
  title?: string;

  // Content é obrigatório apenas se não houver poll
  @ValidateIf(o => !o.poll)
  @IsString()
  @IsNotEmpty()
  content?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  category?: string;

  // Poll é opcional, mas se fornecido deve ser válido
  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePollDto)
  poll?: CreatePollDto;
}
