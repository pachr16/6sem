class User {
    constructor(id, email, username, password) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        // more ?? playlists? artist verification?
    }
}

module.exports = User;