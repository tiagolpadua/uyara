'use strict';

var express = require('express');
var router = express.Router();
var helpers = require('../../../helpers');

/*
 * GET usuarios: http://localhost:3000/api/v1/usuarios
 */
router.get('/', helpers.requiredAuthentication, function(req, res) {
    var connPool = req.connPool;

    connPool.getConnection(function(err, conn) {
        var sql = 'SELECT * FROM cedep_schema.user_table as user_table';

        conn.query(sql, function(err, rows, fields) {

            if (err) {
                conn.release();
                throw new Error(err);
            }

            var usuarios = [];
            if (rows) {
                rows.forEach(function(u) {
                    usuarios.push({
                        login: u.login,
                        full_name: u.full_name
                    });
                });
            }

            res.json(usuarios);

            conn.release();
        });
    });
});

/*
 * GET usuarios: http://localhost:3000/api/v1/usuarios/:login
 */
router.get('/:login', helpers.requiredAuthentication, function(req, res) {
    var connPool = req.connPool;

    var login = req.params.login;

    connPool.getConnection(function(err, conn) {
        var sql = 'SELECT * FROM cedep_schema.user_table as user_table WHERE login = \"' + login + '\"';

        conn.query(sql, function(err, rows, fields) {

            if (err) {
                conn.release();
                throw new Error(err);
            }

            var usuario = {};
            if (rows) {
                usuario = {
                    login: rows[0].login,
                    full_name: rows[0].full_name
                };
            }

            res.json(usuario);

            conn.release();
        });
    });
});

/*
 * DELETE usuario: http://localhost:3000/api/v1/usuarios/{login}
 */
router.delete('/:login', helpers.requiredAuthentication, function(req, res) {

    var login = req.params.login;

    if (login === 'admin') {
        res.send(400, 'Usuário admin não pode ser excluído');
    }

    /*
    var connPool = req.connPool;   

    connPool.getConnection(function(err, conn) {
      var sql = 'SELECT * FROM cedep_schema.user_table as user_table';

      conn.query(sql, function(err, rows, fields) {

          if (err) {
              conn.release();
              throw new Error(err);
          }

          var usuarios = [];
          if (rows) {
            rows.forEach(function (u) {
                usuarios.push({
                    login: u.login,
                    full_name: u.full_name
                });
            });
          }

          res.json(usuarios);

          conn.release();
      });
    });
    */
});

module.exports = router;