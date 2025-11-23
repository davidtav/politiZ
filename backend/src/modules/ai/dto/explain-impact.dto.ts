import { IsString, IsNotEmpty } from 'class-validator';

export class ExplainImpactDto {
    @IsString()
    @IsNotEmpty()
    postId!: string;
}
