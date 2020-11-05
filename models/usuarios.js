'use strict';
module.exports = (sequelize, DataTypes) => {
    var Usuario = sequelize.define('Usuario', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        create_time:{
            type: DataTypes.DATE,
            allowNull: true
        },
        last_update:{
            type: DataTypes.DATE,
            allowNull: true
        },
        nivelseg:{
            type: DataTypes.INTEGER(11)
        },
        iddep:{
            type: DataTypes.INTEGER(11),
            references:{
            model:'departamento',
            key: 'iddep'
            }
        },
        celular:{
            type: DataTypes.STRING
        },
        nip:{
            type: DataTypes.INTEGER(4)
        },
        idevento:{
            type: DataTypes.INTEGER(3),
            references: { 
                model:'evento',
                key: 'idevento'
            }
        },
        Username_last:{
            type: DataTypes.STRING,
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'usuarios'
        });

        Usuario.associate = function (models) {
            Usuario.belongsTo(models.Departamento, { foreignKey: 'iddep' });
            Usuario.hasOne(models.Wo);
            Usuario.belongsTo(models.Evento, { foreignKey: 'idevento' });
        };
    return Usuario;
}