'use strict';
module.exports = (sequelize, DataTypes) => {
    var Color = sequelize.define('Color', {
        idcolor: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numcolor:{
            type: DataTypes.INTEGER,
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
            tableName: 'colores'
        });

        Color.associate = function (models) {           
            Color.hasMany(models.Color);
        };
    return Color;
}