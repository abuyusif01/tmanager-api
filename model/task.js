/**
 * 
 * @param {Sequelized db Object} sequelize 
 * @param {DataTypes} DataTypes 
 * @returns task model
 * 
 * Task model -> taskId(pk), title, description, completed
 * 
 */

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Task;
};