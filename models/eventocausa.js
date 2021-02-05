'use strict';
module.exports = (sequelize, DataTypes) => {
    var Eventocausa = sequelize.define('Eventocausa', {
        IDeventofalla: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        Idevento: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        Codfalla: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Descfalla: {
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
        tableName: 'eventocausa'
    });

    return Eventocausa;
}