const Sequelize = require('sequelize');
const sequelize = require('./database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Survey = require('./survey')(sequelize, Sequelize.DataTypes); // Survey 모델 import
const Question = require('./question')(sequelize, Sequelize.DataTypes);
const Choice = require('./choice')(sequelize, Sequelize.DataTypes);
const Answer = require('./answer')(sequelize, Sequelize.DataTypes);

// 모델 간 관계 설정
User.hasMany(Survey, { foreignKey: 'userId' }); // User와 Survey 간의 관계 설정
Survey.belongsTo(User, { foreignKey: 'userId' });

Survey.hasMany(Question, { foreignKey: 'surveyId' }); // Survey와 Question 간의 관계 설정
Question.belongsTo(Survey, { foreignKey: 'surveyId' });

Question.hasMany(Choice, { foreignKey: 'questionId' }); // Question과 Choice 간의 관계 설정
Choice.belongsTo(Question, { foreignKey: 'questionId' });

Question.hasMany(Answer, { foreignKey: 'questionId' }); // Question과 Answer 간의 관계 설정
Answer.belongsTo(Question, { foreignKey: 'questionId' });

User.hasMany(Answer, { foreignKey: 'userId' }); // User와 Answer 간의 관계 설정
Answer.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Survey,
  Question,
  Choice,
  Answer,
};
