import jwt from "jsonwebtoken";
import AuthError from "../exception/authError";
import tokenService from "../service/token.service";
export default function (roles) {
    return function (req, res, next) {
        var _a;
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            // access if user concrete role
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                return next(AuthError.UnauthorizedError());
            }
            const userData = tokenService.validateAccessToken(token);
            if (!userData) {
                return next(AuthError.UnauthorizedError());
            }
            req.user = userData;
            const { roles: userRoles } = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role.value)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: "You don't have access" });
            }
            next();
        }
        catch (e) {
            console.log(e);
            return res.status(403).json({ message: "User not authorized" });
        }
    };
}
