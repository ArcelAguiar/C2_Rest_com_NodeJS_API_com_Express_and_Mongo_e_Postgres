const peopleModelPg = require('../models/peoples-model-pg');

exports.adicionarPeoplePg = async (req, res) => {

    const people = req.body;

    console.log(people);

    const peopleExiste = await peopleModelPg.findAll({
        where: {
            email: people.email
        }
    });

    console.log(peopleExiste);
    if(peopleExiste.length > 0){
        res.json({
            status: "fail",
            resultado: "Já existe um people com o e-mail cadastrado"
        })
    }else{
        const peopleInserido = await peopleModelPg.create({
            nome: people.nome,
            email: people.email,
            idade: people.idade,
            data_criacao: Date(),
            data_alteracao: null
        });
        res.json({
            status: "ok",
            resultado: peopleInserido
        })
    }

    
}

exports.listarPeoplesPg = async (req, res) => {
    try{
        const peoples = await peopleModelPg.findAll();
        res.json({
            status: 'ok',
            peoples: peoples
        })
    }catch(error){
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Não foi possível recuperar os peoples'
        })
    }
}

exports.listarPeoplePorIDPg = async (req, res) => {
    
    let id_people = req.params.id;
    
    try{
        const peopleEspecifico = await peopleModelPg.findByPk(id_people);
        console.log(peopleEspecifico);
        if(peopleEspecifico){
            res.json({
                status: "ok",
                message: "People recuperado com sucesso",
                people: peopleEspecifico
            })
        }else{
            res.json({
                status: "erro",
                message: `Não encontramos o people de id ${id_people}`
            })
        }
    }catch(erro){
        console.log(erro);
        res.json({
            status: "erro",
            message: `Erro ao recuperar o people de id ${id_people}`
        })
    }
}

exports.atualizarPeoplePg = async (req, res) => {
    let id_people = req.params.id;

    let novoPeople = {
        nome: req.body.nome,
        email: req.body.email,
        idade: req.body.idade,
        data_alteracao: new Date()
    }

    if(id_people){
        
        let peopleAtualizado = await peopleModelPg.update(novoPeople, {where: {id: id_people}})

        if(peopleAtualizado){
            res.json({
                status: "ok",
                message: "People atualizado com sucesso!",
                novoPeople: novoPeople
            })
        }else{
            res.json({
                status: "erro",
                message: `Erro ao atualizar o people de id ${id_people}`
            })
        }
    }else{
        console.log('Sem id'); 
    }
}

exports.removerPeoplePg = async (req, res) => {
    let id_people = req.params.id;

    if(id_people){
        try{
            let peopleDeletado = await peopleModelPg.destroy({where: {id: id_people}});
            if(peopleDeletado){
                res.json({
                    status: "ok",
                    message: `People de id ${id_people} deletado com sucesso!`
                })
            }else{
                res.json({
                    status: "erro",
                    message: `Não foi possível deletar o people de id ${id_people}`
                })

            }
        }catch(erro){
            res.json({
                status: "erro",
                message: `Não foi possível deletar o people de id ${id_people}`
            })
        }
    }

}