module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      survey_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Survey',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM('MULTIPLE_CHOICE', 'SUBJECTIVE_QUESTION', 'CHECKBOX', 'DROPDOWN'),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'Question',
      timestamps: true,
      paranoid: true,
    },
  );

  return Question;
};
