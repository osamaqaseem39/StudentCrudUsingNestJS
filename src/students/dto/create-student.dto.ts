import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    age: number;

    @IsNotEmpty()
    @IsString()
    grade: string;
} 