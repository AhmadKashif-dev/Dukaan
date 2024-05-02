import bcrypt from "bcryptjs"
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: 'Kashif Ahmad',
        email: 'kashif@example.com',
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: 'Jawad Ahmad',
        email: 'jawad@example.com',
        password: bcrypt.hashSync("123456", 10),
    },
]
export default users