const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Planet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Planet.belongsToMany(models.Star, { through: 'PlanetStars' });
    }
  }
  Planet.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    size: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 500] 
      }
    }
  }, {
    sequelize,
    modelName: 'Planet',
    tableName: 'planets'
  });
  return Planet;
};