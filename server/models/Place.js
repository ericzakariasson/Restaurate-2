module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('place', {
    id: { 
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    googlePlaceId: DataTypes.STRING,
    name: DataTypes.STRING,
    review: DataTypes.JSONB,
  });

  Place.associate = models => {
  }

  return Place;
}