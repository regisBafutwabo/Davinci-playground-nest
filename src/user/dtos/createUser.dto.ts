import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsOptional()
  readonly firstName: string;

  @IsOptional()
  readonly familyName: string;

  @IsOptional()
  readonly password: string;

  @IsOptional()
  readonly picture: string;
}
