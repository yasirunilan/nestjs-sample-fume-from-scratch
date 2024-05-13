import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.userService.findUserByEmail(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User): Promise<{ access_token: string }> {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
