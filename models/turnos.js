'use strict';
module.exports = (sequelize, DataTypes) => {
    var Turnos = sequelize.define('Turnos', {
        idturno: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        turno: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numturno: {
            type: DataTypes.INTEGER(11),
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
        tableName: 'turnos'
    });

    return Turnos;
}