'use strict';
module.exports = (sequelize, DataTypes) => {
    var Maquina = sequelize.define('Maquina', {
        idmaquina: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        maquina: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING
        },
        idarea: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'area',
                key: 'idarea'
            }
        },
        tipoequipo: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'tipoequipo',
                key: 'idtipo'
            }
        },
        idmodulo: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'modulointerfaz',
                key: 'idmodulo'
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
        tableName: 'maquina'
    });

    Maquina.associate = function (models) {
        Maquina.belongsTo(models.Area, { foreignKey: 'idarea' });
        Maquina.belongsTo(models.ModuloInterfaz, { foreignKey: 'idmodulo' });
        Maquina.belongsTo(models.TipoEquipo, { foreignKey: 'tipoequipo' });
    };
    return Maquina;

    // Maquina.belongsTo(models.ModuloInterfaz) idmodulo will be added on Maquina
    //Relacion 1-1 con ModuloInterfaz
}