import { Request, Response } from "express"
import { AuthService } from "../Services/Authentication/AuthService";


const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.send({ message: "invalid or missing data" });
    }
    let checker = authService.login(email, password);
    if (!(await checker.checkLogin())) {
        return res.send({ message: "email or password is incorrect" });
    }
    const data = (await checker.saveTokenAndGet());
    res.json({ data });
}