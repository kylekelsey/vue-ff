const express = require('express'),
    path = require('path'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    http = require('http');
    config = require('./src/utils/DB')
    bodyParser = require('body-parser')
    router = express.Router();

    const mountsRoute = require('./src/routes/mounts.route')
    const accountsRoute = require('./src/routes/account.route')
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );

    const app = express();
    app.use(cors())
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
    app.use('/mounts', mountsRoute)
    app.use('/account', accountsRoute)


    const port = process.env.PORT || 3000;
    // app.use(express.static(path.join(__dirname, '/dist/wmounts')));
    // app.get("/*", (req,res) => res.sendFile(path.join(__dirname)))
    app.get('*', function(req,res) {
      res.sendFile(__dirname + '/src/index.html')
    })
    
    const server = app.listen(port,function(){
        console.log('Listening on port ' + port);
    });


