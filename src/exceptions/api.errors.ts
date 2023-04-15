export const AppError = {
    ALREADY_REGISTERED: 'Такой пользователь уже существует',
    // USER_NOT_FOUND: 'Пользователь не найден',
    WRONG_PASSWORD_OR_LOGIN: 'Неправильный пароль или логин',
    TOKEN_OVERDUE: 'Необходимо ввести данные снова'
}

// export class ApiError extends Error {
//     status;
//     errors;
//
//     constructor(status, message, errors = []) {
//         super(message);
//         this.status = status;
//         this.errors = errors;
//     }
//
//     static UnauthorizedError() {
//         return new ApiError(401, 'Пользователь не авторизован');
//     }
//
//     static BadRequest(message, errors = []) {
//         return new ApiError(400, message, errors);
//     }
// }