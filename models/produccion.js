'use strict';
module.exports = (sequelize, DataTypes) => {
    var Produccion = sequelize.define('Produccion', {
        idproduccion: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        Fecha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idmaquina: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        lote: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        Cantidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Intervalo:{
            type:DataTypes.STRING,
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
            tableName: 'Produccion'
        });

    return Produccion;
}