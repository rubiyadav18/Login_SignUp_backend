const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const UserDetails = {
        firstName: { type: DataTypes.STRING, allowNull: true },
        lastName: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
        phoneNumber: { type: DataTypes.STRING, allowNull: true },
        mail: { type: DataTypes.STRING, allowNull: true },
        gender: { type: DataTypes.STRING, allowNull: true },
        weight: { type: DataTypes.STRING, allowNull: true },
        occupaction: { type: DataTypes.STRING, allowNull: true },
        BMI: { type: DataTypes.STRING, allowNull: true },
        age: { type: DataTypes.STRING, allowNull: true },
        height: { type: DataTypes.STRING, allowNull: true },
        medical_condition: { type: DataTypes.STRING, allowNull: true },
        food_habit: { type: DataTypes.STRING, allowNull: true },
        food_allig: { type: DataTypes.STRING, allowNull: true },
        meal_a_day: { type: DataTypes.STRING, allowNull: true },
        Breackfast: { type: DataTypes.STRING, allowNull: true },
        Lunch: { type: DataTypes.STRING, allowNull: true },
        snacks: { type: DataTypes.STRING, allowNull: true },
        Dinner: { type: DataTypes.STRING, allowNull: true },
    };

   
    return sequelize.define('User', UserDetails);
}

