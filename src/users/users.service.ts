import { Injectable } from '@nestjs/common';

export type User = {
    id: number,
    name: string,
    age: number,
    gender: string
}

let users: User[] = [
    {
        id: 1,
        name: "Alice Smith",
        age: 28,
        gender: "Female"
    },
    {
        id: 2,
        name: "Bob Johnson",
        age: 34,
        gender: "Male"
    },
    {
        id: 3,
        name: "Clara Davis",
        age: 19,
        gender: "Female"
    },
    {
        id: 4,
        name: "David Brown",
        age: 45,
        gender: "Male"
    },
    {
        id: 5,
        name: "Emma Wilson",
        age: 22,
        gender: "Female"
    },
    {
        id: 6,
        name: "Frank Taylor",
        age: 30,
        gender: "Male"
    },
    {
        id: 7,
        name: "Grace Lee",
        age: 27,
        gender: "Female"
    },
    {
        id: 8,
        name: "Henry Clark",
        age: 53,
        gender: "Male"
    },
    {
        id: 9,
        name: "Isabella Martinez",
        age: 31,
        gender: "Female"
    },
    {
        id: 10,
        name: "James Rodriguez",
        age: 26,
        gender: "Male"
    }
];

@Injectable()
export class UsersService {
    constructor() {
        console.log("user service created")
    }

    find(gender?: "Male" | "Female") {
        if (gender) return users.filter((u) => u.gender === gender)
        return users
    }
    findOne(id: number) {
        return users.find((u) => u.id === id)
    }
    createOne(user: User) {
        if (users.find((u) => u.id === user.id)) throw new Error("user with this id already exists")
        users.push(user)
        return user
    }
    updateOne(id: number, user: Omit<User, "id">) {
        const updatedUser = { id: +id, ...user }
        const idx = users.findIndex((u) => u.id === id)
        users.splice(idx, 1, updatedUser)
        return updatedUser
    }
    deleteOne(id: number) {
        const idx = users.findIndex((u) => u.id === id)
        users.splice(idx, 1)
        return users
    }
}
