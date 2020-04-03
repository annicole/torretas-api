'use strict'

module.exports = (sequelize, Datatypes) => {
    var ConfiguracionModulo = sequelize.define('ConfiguracionModulo', {
        idconfiguracion: {
            primaryKey: true,
            type: Datatypes.INTEGER(11)
        },
        entrada: {
            type: Datatypes.STRING,
            allowNull: false
        },
        tipoentrada: {
            type: Datatypes.INTEGER(1),
            allowNull:false
        },
        idevento: {
            type: Datatypes.INTEGER(11),
            references: {
                model: 'evento',
                key: 'idevento'
            }
        },
        idperfil: {
            type: Datatypes.INTEGER(11),
            references: {
                model: 'perfilconfig',
                key: 'idperfil'
            }
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'configuracionmodulo'
    });

    ConfiguracionModulo.associate = function (models) {
        ConfiguracionModulo.belongsTo(models.PerfilConfig, { foreignKey: 'idperfil' });
        ConfiguracionModulo.belongsTo(models.Evento, { foreignKey: 'idevento' });
    };

    //Relacion one to Many con PerfilConfig
    return ConfiguracionModulo;

}