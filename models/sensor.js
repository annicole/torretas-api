'use strict';
module.exports = (sequelize, DataTypes) => {
    var Sensor = sequelize.define('Sensor', {
        idsensor: {
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
        },
        idmaquina:{
            type: DataTypes.INTEGER(11),
            references:{
            model:'maquina',
            key: 'idmaquina'
            }
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'sensor'
        });

    Sensor.associate = function (models) {
        Sensor.belongsTo(models.Maquina);
    };
    return Sensor;
}