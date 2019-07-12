'use strict';
module.exports = (sequelize, DataTypes) => {
    var Area = sequelize.define('Area', {
        id_area: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
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
       Area.hasMany(models.Maquina,{as:'maquina',foreignKey:'id_maquina'});
       Area.belongsTo(models.Departamento,{as:'idDepartamento',foreignKey:'id_departamento'});
    };
    return Area;
}