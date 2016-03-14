'use strict';

var express = require('express');
var router = express.Router();

/*
 * GET alunos.
 */
router.get('/', function(req, res) {
    /*
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
    */
    var db = req.db;
    console.log('DB: ' + JSON.stringify(db));

    res.json(db.alunos);
});

/*
 * POST adiciona aluno.
 */
router.post('/', function(req, res) {
    var db = req.db;

    if (!req.body.nome) {
        res.send(400, 'Nome não preenchido');
        return;
    }

    var novoAluno = {
        id: 1,
        nome: req.body.nome
    };

    db.alunos.forEach(function(aluno) {
        if (aluno.id >= novoAluno.id) {
            novoAluno.id = aluno.id + 1;
        }
    });

    db.alunos.push(novoAluno);

    console.log('DB: ' + JSON.stringify(db));

    res.send(201, novoAluno);

    /*
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
	*/
});

module.exports = router;