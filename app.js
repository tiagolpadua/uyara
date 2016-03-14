'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mysql = require('mysql');
var path = require('path');
var session = require('express-session');

//TODO: Logar com usuário correto no BD
var connPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

connPool.getConnection(function(err, conn) {
    if(err) {
        console.log('Não foi possível estabelecer uma conexão com o banco de dados, ele foi iniciado?');
        throw err;
    }
        
    var sql = 'SELECT * FROM cedep_schema.user_table';

    conn.query(sql, function(err, rows, fields) {

        if (err) {
            conn.release();
            throw err;
        }

        if (rows) {
            console.log('Quantidade de usuários cadastrados: ' + rows.length);
        }

        conn.release();
        console.log('Conexão realizada com sucesso!');
        return;
    });
});

//var routes = require('./routes/index');
var alunos = require('./routes/api/v1/alunos');
var login = require('./routes/api/v1/login');
var logout = require('./routes/api/v1/logout');
var usuarios = require('./routes/api/v1/usuarios');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'cedep_paranoa2015',
    saveUninitialized: true,
    resave: true
}));

// Session-persisted message middleware
app.use(function(req, res, next) {
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next();
});

// Torna o pool de conexões acessível ao roteador
app.use(function(req, res, next) {
    req.connPool = connPool;
    next();
});

//app.use('/', routes);
app.use('/api/v1/alunos', alunos);
app.use('/api/v1/login', login);
app.use('/api/v1/logout', logout);
app.use('/api/v1/usuarios', usuarios);

// Rotas não encontradas retornam erro 404 (catch 404 and forward to error handler)
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*
 Tratadores de erro
*/
// Tratador de erros para desenvolvimento, stacktraces são enviados ao usuário
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log(err);
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    });
}

// Tratador de erros para produção, stacktraces não são enviados ao usuário
app.use(function(err, req, res, next) {
    console.log(err);
    res.send(err.status || 500, err.message);
});


/*
  Procedimentos de encerramento da aplicação
*/

//Bloqueia o encerramento automático para permitir procedimentos de limpeza
process.stdin.resume();

function exitHandler(options, err) {
    if (options.cleanup) {
        console.log('Procedimentos finais de limpeza...');
    }

    if (err) {
        console.log(err.stack);
    }

    if (options.exit) {
        console.log('Encerrando conexão com o banco de dados...');
        connPool.end(function(err) {
            if (err) {
                console.error('Erro ao desconectar do pool: ' + err);
            } else {
                console.log('Pool desconectado com sucesso!');
            }
            process.exit();
        });
    }
}

//Faz algo quando a aplicação está fechando
process.on('exit', exitHandler.bind(null, {
    cleanup: true
}));

//Intercepta o evento ctrl+c
process.on('SIGINT', exitHandler.bind(null, {
    exit: true
}));

//Intercepta excessões não tratadas
process.on('uncaughtException', exitHandler.bind(null, {
    exit: true
}));

module.exports = app;