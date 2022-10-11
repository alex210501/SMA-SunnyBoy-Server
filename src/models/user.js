class User {
    #id;

    constructor(id, username, password) {
        this.#id = id;
        this.#username = username;
        this.#password = password;
    }

    get id() {
        return this.#id;
    }

    get username() {
        return this.#username;
    }

    get password() {
        return this.#password;
    }
}