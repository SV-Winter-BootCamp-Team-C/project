module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      surveyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Survey',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM(
          'MULTIPLE_CHOICE',
          'SUBJECTIVE_QUESTION',
          'CHECKBOX',
          'DROPDOWN',
        ),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
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
