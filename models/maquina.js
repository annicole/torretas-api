'use strict';
module.exports = (sequelize, DataTypes) => {
    var Maquina = sequelize.define('Maquina', {
        idmaquina: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        maquina: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'maquina'
        });

    Maquina.associate = function (models) {
        Maquina.belongsTo(models.Area,{as:'area',foreignKey: 'fk_maquina_Area1'});
        Maquina.hasMany(models.Sensor,{as:'sensor',foreignKey:'id_sensor'});
    };
    return Maquina;
}