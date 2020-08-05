var crypto = require('crypto');
const { users } = require('.');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            is: /^[0-9a-zA-Z]{12}$/i
        },
        role: {
            type: DataTypes.ENUM('admin','manager','user','inactive')
        },
        password: {
            type: DataTypes.STRING(64),
        },
        seed: {
            type: DataTypes.STRING(64),
        },
    });

    user.encryptPassword = function( seed, password ) {
        return crypto.pbkdf2Sync(password, seed, 10000, 64, 'sha512').toString('hex').slice(0,64);
    }

    user.generateSeed = function() {
        return crypto.randomBytes(64).toString('hex').slice(0,64);
    }

    user.isValidUsername = function(username) {
        var re = /^[A-Za-z0-9_\-]{5,}$/;
        return re.test(String(username).toLowerCase());
    }

    user.isValidPassword = function(password) {
        if (password.length >= 5) {
            return true;
        }
        return false;
    }
    
    user.generateSeed = function() {
        return crypto.randomBytes(64).toString('hex').slice(0,64);
    }

    user.prototype.isActive = function() {
        if( this.role == 'inactive' ) return false;
        else return true;
    }

    user.prototype.validPassword = function(test_password) {
        return this.password == user.encryptPassword(this.seed, test_password);
    }
    return user;
};
