var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://gio:123@ds157475.mlab.com:57475/compare-prices-online', ['productos']);

//productos de un supermercado
router.get('/productos/:supermercado', function(req, res, next){
    db.productos.find({supermercado: req.params.supermercado}, function(err, productos){
    	if(err){
    		res.send(err);
    	}
    	res.json(productos);
    });
});

module.exports = router;