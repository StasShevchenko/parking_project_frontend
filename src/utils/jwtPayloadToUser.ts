import {User} from "../context/auth.context.ts";

export const jwtPayloadToUser = (jwtPayload: User): User  => {
    return {
        id: jwtPayload.id,
        email: jwtPayload.email,
        isAdmin: jwtPayload.isAdmin,
        isSuperAdmin: jwtPayload.isSuperAdmin,
        queueUser: jwtPayload.queueUser,
        firstName: jwtPayload.firstName,
        secondName: jwtPayload.secondName,
        changedPassword: jwtPayload.changedPassword,
        avatar: jwtPayload.avatar,
    }
}