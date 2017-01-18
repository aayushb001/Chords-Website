var express = require('express');        
var app = express();                 
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./app/models/bear'); //Bear stores user email and user password

var Chord = require('./app/models/chord');

var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/bears'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;      


var router = express.Router(); 


router.use(function(req, res, next) {
    
    console.log('Something is happening.');
    next(); 
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/authentication')
    
    .post(function(req, res) {
        var bear = new Bear();
        var newemail = req.query['email'] || 'default';
        var newpass = req.query['password'] || 'default';
        
        const saltRounds = 10;
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(newpass, salt);
        console.log(hash);
        console.log(newemail);
        console.log(newpass);
        Bear.find( { email: newemail }, function(err, tempbear){
            if (err){
                return res.send(err);
            }
            console.log(tempbear);
            if (tempbear[0] != null) {
                res.json({'result': false});
            } else {
                bear.email = newemail;
                bear.password = hash;
                bear.save(function(err) {
                    if (err)
                        return res.send(err);

                    res.json({ 'result': true });
                });
            }
            
        });
        
    })
    
    .get(function(req, res) {
        var guessE = req.query['email'] || 'default';
        var guessP = req.query['password'] || 'default';
        
        Bear.find( { email: guessE }, function(err, bear){
            if (err){
                return res.send(err);
            }
            console.log(bear);
            if (bear[0] != null) {
                var result = bcrypt.compareSync(guessP,bear[0].password);
                res.json({'result': result});
            } else {
                res.json({'result': false});
            }
            
        });
    });

router.route('/chords')
    .post(function(req, res) {
        var chord = new Chord();     
        // chord.sheetname = req.body.sheetname;  
        // chord.author = req.body.author;
        // chord.chordsstring = req.body.chordsstring;
        // chord.viewstatus = req.body.viewstatus;
        // chord.sheetversion = req.body.sheetversion;
        
        chord.sheetname = req.query['sheetname'] || 'default';
        chord.author = req.query['author'] || 'default';
        chord.chordsstring = req.query['chordsstring'] || 'default';
        chord.viewstatus = req.query['viewstatus'] || 'default';
        chord.sheetversion = req.query['sheetversion'] || '1';
        chord.datetime = req.query['datetime'] || 'default';
        
        chord.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'Chord created!' });
        });
        
    })
    
    .get(function(req, res) {
        Chord.find(function(err, chords) {
            if (err)
                return res.send(err);
            res.json(chords);
        });
    })
    
    router.route('/chords/:chord_id')
    
    .get(function(req, res) {
        
        Chord.findById(req.params.chord_id, function(err, chord) {
            if (err)
                return res.send(err);
            res.json(chord);
        });
    })
    
    .put(function(req, res) {

        
        Chord.findById(req.params.chord_id, function(err, chord) {

            if (err)
                return res.send(err);
            
            chord.sheetname = req.query['sheetname'] || chord.sheetname;
            chord.author = req.query['author'] || chord.author;
            chord.chordsstring = req.query['chordsstring'] || chord.chordsstring;
            chord.viewstatus = req.query['viewstatus'] || chord.viewstatus;
            chord.sheetversion = req.query['sheetversion'] || chord.sheetversion;
            chord.datetime = req.query['datetime'] || 'default';
            
            // chord.sheetname = req.body.sheetname;  
            // chord.author = req.body.author;
            // chord.chordsstring = req.body.chordsstring;
            // chord.viewstatus = req.body.viewstatus;
            // chord.sheetversion = req.body.sheetversion;
            
            
            chord.save(function(err) {
                if (err)
                    return res.send(err);

                res.json({ message: 'Chord updated!' });
            });

        });
    })
    
    .delete(function(req, res) {
        Chord.remove({
            _id: req.params.chord_id
        }, function(err, chord) {
            if (err)
                return res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/bears')
    
    .post(function(req, res) {
        var bear = new Bear();     
        bear.email = req.body.email;  
        bear.password = req.body.password; 
        
        bear.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    })
    
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                return res.send(err);
            res.json(bears);
        });
    })
    
    router.route('/bears/:bear_id')
    
    .get(function(req, res) {
        
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                return res.send(err);
            res.json(bear);
        });
    })
    
    .put(function(req, res) {

        
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                return res.send(err);

            bear.email = req.body.email; 
            bear.password = req.body.password;
            
            
            bear.save(function(err) {
                if (err)
                    return res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                return res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/public', express.static('public'));

app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);