'use strict';
module.exports = (sequelize, DataTypes) => {
    var Producto = sequelize.define('Producto', {
        idproducto: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        producto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desc_producto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        te_producto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        um_producto: {
            type: DataTypes.INTEGER(11),
            references:{
            model:'um',
            key: 'idum'
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
            tableName: 'producto'
        });

    Producto.associate = function (models) {
        Producto.belongsTo(models.Um, { foreignKey: 'um_producto' });

        Producto.hasOne(models.Wosub, { foreignKey: 'idproducto' });
    };
    return Producto;
}