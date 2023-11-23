const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        phoneNumber: { type: DataTypes.STRING, allowNull: true },
        mail: { type: DataTypes.STRING, allowNull: true },
        OTP: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        defaultScope: {

        },
        scopes: {

        }
    };

    return sequelize.define('OTP', attributes, options);
}
