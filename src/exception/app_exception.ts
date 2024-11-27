export default class AppException implements Error {
    name: string;
    message: string;
    stack?: string ;


    constructor(name: string, message: string, stack?: string) {
        this.name = name;
        this.message = message;
        this.stack = stack;
    }
}
