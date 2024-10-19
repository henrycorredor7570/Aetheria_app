/*Este modelo Visit te permite rastrear y gestionar las visitas virtuales de los usuarios a los destinos en tu plataforma. 
Puedes usarlo para generar estadísticas, ofrecer funcionalidades de "continuar visita", y más.*/
const Visit = ( sequelize, DataTypes) => {
    return sequelize.define('Visit', {
        visit_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },   
    },{
        timestamps: true,
        underscored: true,
        indexes: [
            {
                fields: ['user_id']
            },
            {
                fields: ['destination_id']
            },
            {
                fields: ['visit_date']
            }
        ]
    });
};

export default Visit;