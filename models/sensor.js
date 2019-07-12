'use strict';
module.exports = (sequelize, DataTypes) => {
    var Sensor = sequelize.define('Sensor', {
        id_sensor: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        sensor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        intermitente:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipo:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            paranoid: true
        });

    Sensor.associate = function (models) {
        Sensor.belongsTo(models.Maquina,{as:'maquina',foreignKey:'fk_sensor_maq'});
    };
    return Sensor;
}