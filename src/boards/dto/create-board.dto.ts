import { IsNotEmpty } from "class-validator";

// DTO 역시 Interface 와 class 모두 사용 가능
export class CreateBoardDto {
    @IsNotEmpty() // pipe (validator) 적용
    title: string;

    @IsNotEmpty() // pipe (validator) 적용
    description: string;
}