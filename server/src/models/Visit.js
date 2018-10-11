module.exports = (sequelize, DataTypes) => {
  const Visit = sequelize.define('visit', {
    id: { 
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    visitAt: DataTypes.DATE,
    score: DataTypes.FLOAT,
    review: DataTypes.JSONB,
  });

  Visit.associate = models => {
    Visit.belongsTo(models.User);
  }

  return Visit;
}