module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: { 
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    googleId: DataTypes.STRING,
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { isUrl: true },
    }
  });

  User.associate = models => {
    User.hasMany(models.Visit);
  }

  return User;
}