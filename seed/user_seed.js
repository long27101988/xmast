const seeder = require('mongoose-seed');
const config = require('../config')
const crypto = require('crypto')

let salt = crypto.randomBytes(16).toString('hex');
let password = crypto.pbkdf2Sync("12345678", salt, 1000, 64, 'sha1').toString('hex');

let item = [{
    name: "admin",
    email: "admin@test.com",
    salt: salt,
    password: password,
    date: new Date()
}]

let data = [
    {
        model: "User",
        documents: item
    }
]

seeder.connect(config.dbConnectString, function() {
    seeder.loadModels([
        '../models/user'
    ])

    seeder.clearModels(['User'], function() {
        seeder.populateModels(data, function() {
            seeder.disconnect();
        })
    })
})
module.exports = seeder;