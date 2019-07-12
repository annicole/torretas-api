'use strict';
module.exports = (sequelize, DataTypes) => {
    var Departamento = sequelize.define('Departamento', {
        id_departamento: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        departamento: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            paranoid: true
        });

    Departamento.associate = function (models) {
        Departamento.hasMany(models.Area,{as:'area',foreignKey:'id_area'});
        Departamento.belongsTo(models.Cia,{as:'idCia',foreignKey:'id_cia'});
    };
    return Departamento;
}