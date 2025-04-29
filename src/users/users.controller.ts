import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    // usersService: UsersService = new UsersService()

    private parseCreateUserInput(input: UserInput): User {
        const user: User = {
            ...input,
            id: +input.id,
            age: +input.age
        }
        return user
    }
    private parseUpdateUserInput(input: Omit<UserInput, "id">): Omit<User, "id"> {
        const user: Omit<User, "id"> = {
            ...input,
            age: +input.age
        }
        return user
    }

    @Get()
    find(@Query("gender") gender?: "Male" | "Female") {
        return this.usersService.find(gender)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Post()
    createOne(@Body() userInput: UserInput) {
        try {
            const user = this.parseCreateUserInput(userInput)
            return this.usersService.createOne(user)
        } catch (error) {
            return { error: error.message }
        }

    }

    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() userInput: Omit<UserInput, "id">) {
        const user = this.parseUpdateUserInput(userInput)
        return this.usersService.updateOne(+id, user)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.usersService.deleteOne(+id)
    }
}

type UserInput = {
    id: string,
    name: string,
    age: string,
    gender: string
}