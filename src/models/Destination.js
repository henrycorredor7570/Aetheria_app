/*Este modelo Destination es central en tu plataforma de Viajes Virtuales con AR, ya que representa los lugares que los usuarios pueden
 visitar virtualmente. Las asociaciones permiten una fácil relación con reseñas, puntos de interés, modelos AR y visitas, lo que 
 facilita la creación de experiencias ricas y detalladas para los usuarios.*/
const Destination = (sequelize, DataTypes) => {
    return sequelize.define('Destination', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate:{
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: -180,
                max: 180
            }
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }
    },{
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['name']
            },
            {
                fields: ['country']
            },
            {
                fields: ['latitude', 'longitude']
            }
        ]
    });
};

export default Destination;