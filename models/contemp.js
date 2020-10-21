'use strict';

module.exports = (sequelize, DataTypes) => {
    var Contemp = sequelize.define('Contemp',
        {
            idcontemp: {
                primaryKey: true,
                type: DataTypes.INTEGER(11)
            },
            idempresa: {
                type: DataTypes.INTEGER(11),
                reference: {
                    model: 'empresa',
                    key: 'idempresa'
                }
            },
            nomcontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            depcontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            puestocontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pbxcontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            extcontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            movcontemp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            emailcontemp: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },


        {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'contemp'
        });

    Contemp.associate = function (models) {
        Contemp.hasOne(models.Empresa, { foreignKey: 'idempresa' });
    };

    return Contemp;
};

