const user = require('../models/user');

const { User, Survey, Answer, Question, Choice } = require('../models');
const { Console } = require('console');

const signup = async (req, res) => {
    try {
        const email = req.body.email;
        //toDo: 이메일 양식인지 체크하기
        const name = req.body.name;
        const password = req.body.password;
        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'email', 'password', 'name']
        })
        if (!(user === null)) {
            res.status(400).json({ message: "회원가입에 실패하였습니다."});
        }
        
        User.create({
            name: name,
            email: email,
            password: password
        }).then((user) => {
            console.log(user);
            res.status(201).json({ message: "회원가입 성공"});
        })
        .catch(error => {
            sendServerError(error, res);
        });
    } catch (error) {
        sendServerError(error, res);
    }
}
const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({
            where: {
                email: email
            },
            attributes: ['id', 'email', 'password', 'name']
        })
        if (user === null) {
            res.status(404).json({ message: "존재하지 않는 메일입니다."});
        } else {
            if (password === user.password) {
                res.status(200).json({ id: user.id });
            } else {
                res.status(401).json({ message: "비밀번호가 틀렸습니다."});
            }
        }
    } catch (error) {
        sendServerError(error, res);
    }
}
const logout = async (res) => {
}
//to Do: 없는 메일일 때 오류수정
const isEmailRepeated = async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await User.findOne({
            where: {
                email: userEmail
            },
            attributes: [ 'email' ]
        })
        if (user === null) {
            res.status(200).json({ email: userEmail, exists:false });
        } else {
            res.status(200).json({ email: userEmail, exists:true });
        }     
    } catch(error) {
        sendServerError(error, res);
    }
}
const modifyPassword = async (req, res) => {
    try {
        const updatedPassword = req.params.password;
        const condition = {
            where: {
                id: req.body.id
            }
        };
        await User.update(updatedPassword, condition).then (() => {
            res.status(200).json({ message: "수정이 완료되었습니다."});
        }).catch (error => {
            res.status(400).json({ message: "비밀번호 수정에 실패하였습니다."});       
        })
    } catch (error) {
        sendServerError(error, res);    
    }
}
function sendServerError(error, res) {
    console.error(error);
    res.status(500).send('Internal Server Error');
    return;
}

module.exports = { signup, login, logout, isEmailRepeated, modifyPassword };