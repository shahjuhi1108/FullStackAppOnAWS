import rewire from "rewire"
const auth_router = rewire("./auth.router")
const generatePassword = auth_router.__get__("generatePassword")
const comparePasswords = auth_router.__get__("comparePasswords")
const generateJWT = auth_router.__get__("generateJWT")
import * as class_transformer from "class-transformer"
import * as User from "../models/User"
// @ponicode
describe("generatePassword", () => {
    test("0", async () => {
        await generatePassword("$p3onyycat")
    })

    test("1", async () => {
        await generatePassword("!Lov3MyPianoPony")
    })

    test("2", async () => {
        await generatePassword("YouarenotAllowed2Use")
    })

    test("3", async () => {
        await generatePassword("accessdenied4u")
    })

    test("4", async () => {
        await generatePassword("NoWiFi4you")
    })

    test("5", async () => {
        await generatePassword("")
    })
})

// @ponicode
describe("comparePasswords", () => {
    test("0", async () => {
        await comparePasswords("!Lov3MyPianoPony", "$p3onyycat")
    })

    test("1", async () => {
        await comparePasswords("YouarenotAllowed2Use", "YouarenotAllowed2Use")
    })

    test("2", async () => {
        await comparePasswords("$p3onyycat", "accessdenied4u")
    })

    test("3", async () => {
        await comparePasswords("YouarenotAllowed2Use", "$p3onyycat")
    })

    test("4", async () => {
        await comparePasswords("NoWiFi4you", "NoWiFi4you")
    })

    test("5", async () => {
        await comparePasswords("", "")
    })
})

// @ponicode
describe("generateJWT", () => {
    test("0", () => {
        let inst2: any = new Date("01-01-2020")
        let inst: any = new Date("01-13-2020")
        let callFunction: any = () => {
            generateJWT(class_transformer.plainToClass(User.User,{ email: "user1+user2@mycompany.com", password_hash: "$p3onyycat", createdAt: inst, updatedAt: inst2 }))
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let inst2: any = new Date("01-01-2030")
        let inst: any = new Date("01-01-2030")
        let callFunction: any = () => {
            generateJWT(class_transformer.plainToClass(User.User,{ email: "something.example.com", password_hash: "YouarenotAllowed2Use", createdAt: inst, updatedAt: inst2 }))
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let inst2: any = new Date("01-01-2030")
        let inst: any = new Date("32-01-2020")
        let callFunction: any = () => {
            generateJWT(class_transformer.plainToClass(User.User,{ email: "TestUpperCase@Example.com", password_hash: "accessdenied4u", createdAt: inst, updatedAt: inst2 }))
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let inst2: any = new Date("32-01-2020")
        let inst: any = new Date("32-01-2020")
        let callFunction: any = () => {
            generateJWT(class_transformer.plainToClass(User.User,{ email: "email@Google.com", password_hash: "YouarenotAllowed2Use", createdAt: inst, updatedAt: inst2 }))
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let inst2: any = new Date("01-01-2020")
        let inst: any = new Date("01-01-2030")
        let callFunction: any = () => {
            generateJWT(class_transformer.plainToClass(User.User,{ email: "something.example.com", password_hash: "NoWiFi4you", createdAt: inst, updatedAt: inst2 }))
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let inst2: any = new Date("")
        let inst: any = new Date("")
        let callFunction: any = () => {
            generateJWT(class_transformer.plainToClass(User.User,{ email: "", password_hash: "", createdAt: inst, updatedAt: inst2 }))
        }
    
        expect(callFunction).not.toThrow()
    })
})
