'use strict';

var express = require('express');
var router = express.Router();
var helpers = require('../../../helpers');

router.post('/', function(req, res) {

    if (!req.body.login) {
        res.send(400, 'Preencher o nome do usuário');
        return;
    }

    if (!req.body.password) {
        res.send(400, 'Preencher a senha do usuário');
        return;
    }

    helpers.authenticate(req.connPool, req.body.login, req.body.password, function(err, user) {
        if (err) {
            res.send(400, err.message);
            return;
        }

        if (user) {
            req.session.regenerate(function() {
                req.session.user = user;

                res.json({
                    login: user.login,
                    full_name: user.full_name
                });
            });
        } else {
            res.send(400, 'Falha não esperada durante a autenticação');
        }
    });
});

module.exports = router;