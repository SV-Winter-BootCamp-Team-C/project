const Sequelize = require('sequelize');
const sequelize = require('./database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Survey = require('./survey')(sequelize, Sequelize.DataTypes); // Survey 모델 import
const Question = require('./question')(sequelize, Sequelize.DataTypes);
const Choice = require('./choice')(sequelize, Sequelize.DataTypes);
const Answer = require('./answer')(sequelize, Sequelize.DataTypes);

// 모델 간 관계 설정
Question.belongsTo(Survey, { foreignKey: 'surveyId' }); // Survey와 Question 관계 설정
Question.belongsTo(User, { foreignKey: 'userId' });
Choice.belongsTo(Question, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });
Answer.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Survey,
  Question,
  Choice,
  Answer,
};
