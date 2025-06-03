const User = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, 
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user",//asignamos valor por defecto de usuario a cada registro
            validate:{
                isIn:[["admin","user"]]//para solo permitir valores de admin y user
            }
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false
        },
        verification_token: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        underscored: true // Usa snake_case en lugar de camelCase
    });
};

export default User;
