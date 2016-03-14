'use strict';

var helpers = {};

helpers.authenticate = function(connPool, name, pass, fn) {
    if (!module.parent){ 
      console.log('authenticating %s:%s', name, pass);
    }

    connPool.getConnection(function(err, conn) {
      var sql = 'SELECT * FROM cedep_schema.user_table as user_table WHERE user_table.login = \"' + name + '\"';

      conn.query(sql, function(err, rows, fields) {

          if (err) {
              conn.release();
              throw new Error(err);
          }

          if (rows) {
            //TODO: Não utilizar  a senha plana, fazer um hash
            if(rows.length === 0) {
              fn(new Error('Usuário não localizado!'));
            } else {
              var user = rows[0];
              if (pass === user.password) {
                fn(null, user);
              } else {
                fn(new Error('Senha incorreta'));
              }
            }
          }

          conn.release();
      });
    });
};

helpers.requiredAuthentication = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.send(401, 'Login necessário');
    }
};

helpers.userExist = function (req, res, next) {
  throw new Error('Não implementado!');
  /*  
  User.count({
      username: req.body.username
  }, function (err, count) {
      if (count === 0) {
          next();
      } else {
          req.session.error = "Usuário saiu"
          res.redirect("/signup");
      }
  });
*/
};

module.exports = helpers;