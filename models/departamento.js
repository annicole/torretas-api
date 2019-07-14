'use strict';
module.exports = (sequelize, DataTypes) => {
    var Departamento = sequelize.define('Departamento', {
        iddep: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        departamento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idcia:{
            type: DataTypes.INTEGER(11),
            references:{
            model:'cia',
            key: 'idcia'
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
            tableName: 'departamentos'
        });

    Departamento.associate = function (models) {
        Departamento.belongsTo(models.Cia,{as:'idCia',foreignKey:'fk_dep_cia'});
    };
    return Departamento;
}