import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User } from './users.service';

@Controller('users')
export class UsersController {

    private parseUserInput(input: UserInput): User {
        const user: User = {
            ...input,
            id: +input.id,
            age: +input.age

        }
        return user
    }

    @Get()
    find(@Query("gender") gender?: "Male" | "Female") {
        return `all with filter ${gender}`
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `user ${id}`
    }

    @Post()
    createOne(@Body() user: UserInput) {
        return `user added : ${user}`
    }

    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() user: Omit<UserInput, "id">) {
        return `user ${id} updated : ${user}`
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return `user ${id} deleted`
    }
}

type UserInput = {
    id: string,
    name: string,
    age: string,
    gender: string
}