/*Este modelo Review te permite manejar eficientemente las reseñas de los usuarios en tu plataforma, manteniendo las relaciones con los modelos User y Destination.*/
const Review = (sequelize, DataTypes) => {
    return sequelize.define('Review',{
        rating: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate:{
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        visit_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['user_id']
            },
            {
                fields: ['destination_id']
            }
        ]
    });
};

export default Review;
