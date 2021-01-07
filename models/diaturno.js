'use strict';
module.exports = (sequelize, DataTypes) => {
    var Diaturno = sequelize.define('Diaturno', {
        iddiaturno: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        idturno: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        diasem: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        hrenttur: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duracion: {
            type: DataTypes.INTEGER(15),
            allowNull: false
        },
        tiempoefec: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        tiposeg: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        diaturno: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'diaturno'
    });

    return Diaturno;
}