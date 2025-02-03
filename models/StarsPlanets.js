'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StarsPlanets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StarsPlanets.belongsTo(models.Star, { foreignKey: 'starId' });
      StarsPlanets.belongsTo(models.Planet, { foreignKey: 'planetId' });
    }
  }
  StarsPlanets.init({
    starId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Star',
        key: 'id'
      }
    },
    planetId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Planet',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'StarsPlanets',
    tableName: 'stars_planets',
    timestamps: false,
    primaryKey: ['starId', 'planetId']
  });
  return StarsPlanets;
};