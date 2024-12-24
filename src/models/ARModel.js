/*Este modelo ARModel es esencial para tu plataforma de Viajes Virtuales con AR, ya que permite asociar contenido de realidad aumentada 
a destinos y puntos de interés específicos. Algunos puntos clave:

La flexibilidad del campo metadata permite almacenar información adicional sobre cada modelo AR, lo que puede ser útil para manejar 
diferentes tipos de contenido o requisitos técnicos.
Las asociaciones con Destination y PointOfInterest permiten una gran flexibilidad en cómo se pueden presentar los modelos AR a los u
suarios, ya sea vinculados a un destino general o a un punto de interés específico.
El índice en el campo type facilita la búsqueda rápida de modelos AR por categoría, lo que puede ser útil para filtrar o categorizar 
el contenido AR en la interfaz de usuario. 

Este modelo te permite crear experiencias de AR ricas y variadas, como modelos 3D de monumentos, animaciones interactivas de 
eventos históricos, o superposiciones de información sobre puntos de interés.*/
const ARModel = (sequelize, DataTypes) => {
    return sequelize.define('ARModel', {
        model_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            }
        },
        type: {//por ejemplo, "3D model", "interactive", "animation", etc.
            type: DataTypes.STRING,
            allowNull: false,
        },
        metadata: {//Campo JSON para almacenar información adicional sobre el modelo (como tamaño, formato, instrucciones de uso, etc.).
            type: DataTypes.JSON,
            allowNull: true
        }
    },{
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['destination_id']
            },
            {
                fields: ['point_of_interest_id']
            },
            {
                fields: ['type']
            }
        ]
    });
};

export default ARModel;
