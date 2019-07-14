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
        },
        idarea:{
            type: DataTypes.INTEGER(11),
            references:{
            model:'area',
            key: 'idarea'
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
            tableName: 'maquina'
        });

    Maquina.associate = function (models) {
        Maquina.belongsTo(models.Area);
        Maquina.hasMany(models.Sensor);
    };
    return Maquina;
}