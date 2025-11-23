import { IsString, IsNotEmpty } from 'class-validator';

export class AnalyzeBiasDto {
    @IsString()
    @IsNotEmpty()
    postId!: string;
}
