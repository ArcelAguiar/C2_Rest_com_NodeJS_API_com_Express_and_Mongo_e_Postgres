let router = require('express').Router();

router.get('/', function(req, res){
    res.json({
        status: "ok",
        message: "Servidor da unidade funcionando perfeitamente"
    });
});

module.exports = router;