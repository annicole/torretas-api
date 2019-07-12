'use strict';
module.exports = (sequelize, DataTypes) => {
    var Maquina = sequelize.define('Maquina', {
        id_maquina: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        maquina: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            paranoid: true
        });

    Maquina.associate = function (models) {
        Maquina.belongsTo(models.Area,{as:'idArea',foreignKey:'id_area'});
        Maquina.hasMany(models.Sensor,{as:'sensor',foreignKey:'id_sensor'});
    };
    return Maquina;
}