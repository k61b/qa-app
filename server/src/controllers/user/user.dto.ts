import { IsOptional, IsString } from 'class-validator'

class CreateUserDto {
    @IsString()
    public firstName: string

    @IsString()
    public lastName: string

    @IsString()
    public email: string

    @IsString()
    public password: string

    @IsOptional()
    public profile_image: string
}

export default CreateUserDto