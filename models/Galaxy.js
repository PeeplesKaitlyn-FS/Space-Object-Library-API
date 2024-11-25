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
    name: DataTypes.STRING,
    size: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Galaxy'
  });
  return Galaxy;
};