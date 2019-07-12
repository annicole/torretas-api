'use strict';
module.exports = (sequelize, DataTypes) => {
    var Area = sequelize.define('Area', {
        idarea: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            paranoid: true
        });

    Area.associate = function (models) {
       Area.hasMany(models.Maquina);
       Area.belongsTo(models.Cia,{as:'cia',foreignKey: 'fk_area_cia'});
    };
    return Area;
}