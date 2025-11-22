import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO para criar uma opção de enquete
 */
export class CreatePollOptionDto {
    @IsString()
    @IsNotEmpty()
    text!: string;

    @IsString()
    @IsNotEmpty()
    icon!: string; // Nome do ícone (ex: 'FaThumbsUp')
}
