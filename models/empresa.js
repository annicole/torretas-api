'use strict';
module.exports = (sequelize, DataTypes) => {
    var Empresa = sequelize.define('Empresa', {
        idempresa: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        nomemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombcortemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calleemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numextemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numintemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idpais: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'pais',
                key: 'idpais'
            }
        },
        idestado: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'estado',
                key: 'idestado'
            }
        },
        idciudad: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'ciudad',
                key: 'idciudad'
            }
        },
        pbx1emp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pbx2emp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        webemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idrelacion: {
            type: DataTypes.INTEGER(11),
            references: {
             model: 'relcomp',
             key:' idrelcomercial'
            }
        },
        descuentoemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nomchequeemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numfiscalemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taxemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idcondpago: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'condpago',
                key: 'idcondpago'
            }
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'empresa'
    });

    Empresa.associate = function (models) {
        Empresa.belongsTo(models.Relcomp, { foreignKey: 'idrelacion' });
        Empresa.belongsTo(models.Pais, { foreignKey: 'idpais' });
        Empresa.belongsTo(models.Estado, { foreignKey: 'idestado' });
        Empresa.belongsTo(models.Ciudad, { foreignKey: 'idciudad' });
        Empresa.belongsTo(models.Condpago, { foreignKey: 'idcondpago' });

        Empresa.hasOne(models.Wo, { foreignKey: 'idempresa' });
        Empresa.hasMany(models.Producto);
    };


    return Empresa;
}