'use strict';
module.exports = (sequelize, DataTypes) => {
    var funcusu = sequelize.define('funcusu', {
        IDfuncusu: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        funcusu: {
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
        tableName: 'Funcionusuario'
    });

    // Um.associate = function (models) {
    //     Um.hasOne(models.Producto);
    // };
    return funcusu;
}