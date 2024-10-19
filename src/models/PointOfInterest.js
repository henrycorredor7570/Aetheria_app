/*Este modelo PointOfInterest es crucial para tu plataforma de Viajes Virtuales con AR, ya que permite desglosar cada destino en puntos 
específicos que los usuarios pueden explorar. La asociación con ARModel facilita la vinculación de contenido de realidad aumentada a 
ubicaciones específicas, enriqueciendo la experiencia del usuario.*/
const PointOfInterest = (sequelize, DataTypes) => {
    return sequelize.define('PointOfInterest', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
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
        type: {//Tipo de punto de interés (por ejemplo, "monumento", "museo", "parque", etc.).
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['destination_id']
            },
            {
                fields: ['type']
            },
            {
                fields: ['latitude', 'longitude']
            }
        ]
    });
};

export default PointOfInterest;