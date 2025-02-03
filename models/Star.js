const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Star.belongsTo(models.Galaxy, { foreignKey: 'galaxyId' });
    }
  }
  Star.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    size: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.TEXT,
    galaxyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Galaxy',
        key: 'id'
      },
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Star'
  });
  return Star;
};