import { IsString, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;

    @IsString()
    @IsNotEmpty()
    channelId!: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    image?: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    url!: string;

    @IsString()
    @IsOptional()
    category?: string;
}
