const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    // minweight: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },

    // maxweight: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },

    // minheight: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // maxheight: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight : {
      type: DataTypes.STRING,
      allowNull: false
    },
    lifeSpan: {
      type: DataTypes.STRING,
    },
    image:{
      type: DataTypes.STRING
    },
    
  },
  { timestamps: false });
};