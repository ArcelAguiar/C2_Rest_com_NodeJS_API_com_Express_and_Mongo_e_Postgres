const peoplesModel = require('../models/peoples-model');
const mongodb = require('../infra/mongodb');

exports.adicionarPeople = (req, res) => {
    peoplesModel.find((err, peoples) => {
        if(err){
            console.log("Não foi possível recuperar os peoples!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os peoples e portanto inserir o novo people!"
            });
        }
        //Eu tenho a lista dos peoples

        for(let i = 0; i < peoples.length; i++){
            if(req.body.email === peoples[i].email){
                res.json({
                    status: "erro",
                    message: `O people ${req.body.nome} já está cadastrado com o e-mail ${req.body.email}`
                });
                return;
            }
        }

        let people = new peoplesModel();
        people.nome = req.body.nome;
        people.email = req.body.email;
        people.idade = req.body.idade;
        people.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir a people."
                });
            }else{
                res.send({
                    status: "ok",
                    message: `People ${req.body.nome} inserido com sucesso!`
                });
            }
        })
    });
}

exports.listarPeoples = (req, res) => {
    peoplesModel.find(function(err, people){
        if(err){
            console.log("Não foi possível recuperar os peoples!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os peoples!"
            });
        }else{
            res.json({
                status: "ok",
                peoples: peoples
            })
        } 
        
    });
}

exports.listarPeoplePorID = (req, res) => {
    let id_people = req.params.id;
    
    peoplesModel.findById(id_people, function(err, people){
        if(err || !people){
            console.log(`Não foi possivel recuperar o people de id: ${id_people}`);
            res.json({
                status: "erro",
                message: `Não foi possivel recuperar o people de id: ${id_people}`
            });
        }else{
            res.json({
                status: "ok",
                people: people
            })
        }
        
    });
}

exports.atualizarPeople = (req, res) => {
    let id_people = req.params.id;

    peoplesModel.findById(id_people, (erro, people) => {
        if(erro || !people){
            console.log("Não foi possível recuperar os peoples!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o people de id ${id_people} para atualização`
            });
        }else{
            people.nome = req.body.nome;
            people.email = req.body.email;
            people.idade = req.body.idade;
            people.data_alteracao = Date.now();
            people.save((err => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar o people"
                    });
                }else{
                    res.json({
                        status: "ok",
                        message: `Peolple ${people.nome} atualizado com sucesso!`,
                        novoPeople: people
                    })
                }
            }))
        }
    });
}

exports.removerPeople = (req, res) => {
    let id_people = req.params.id;

    peoplesModel.remove({   
        _id: id_people
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: `Houve um erro ao deletar a people de ${id_people}`
            });
        }else{
            res.json({
                status: "ok",
                message: `People de ${id_people} deletado com sucesso!`
            })
        }
    });
}