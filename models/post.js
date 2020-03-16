module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      guest: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 70]
        }
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 255]
        }
      }, 
    //   category: {
    //     type: DataTypes.STRING,
    //     defaultValue: "Personal"
    //   }
    });
    return Post;
  };