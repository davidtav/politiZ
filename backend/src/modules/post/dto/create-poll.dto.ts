import { IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePollOptionDto } from './create-poll-option.dto';

/**
 * DTO para criar uma enquete
 */
export class CreatePollDto {
    @IsString()
    @IsNotEmpty()
    question!: string;

    @IsArray()
    @ArrayMinSize(2) // Mínimo de 2 opções
    @ValidateNested({ each: true })
    @Type(() => CreatePollOptionDto)
    options!: CreatePollOptionDto[];

    @IsDateString()
    @IsNotEmpty()
    endsAt!: string; // Data de término em formato ISO
}
