const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Galaxy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Galaxy.hasMany(models.Star, { foreignKey: 'galaxyId' });
    }
  }
  Galaxy.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    size: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Galaxy'
  });
  return Galaxy;
};