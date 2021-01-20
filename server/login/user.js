class User{    
    constructor(id, email, hash, type) {
        this.id = id;
        this.email = email;
        this.hash = hash;
        this.type = type;
    }
}

module.exports = User;