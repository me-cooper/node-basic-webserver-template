/* ################################ GENERAL ################################# */
const path              = require('path');

/* ################################ SERVER ################################## */
const express           = require('express');
const router            = express.Router();
const middleware        = require('./../src/middleware/middleware');

/* ################################ RENDER ENGINE ########################### */
const viewsPath         = path.join(__dirname, '..', 'views');
const eta               = require('eta');
eta.configure           ({ views: viewsPath });

/* ################################ ROUTE ################################### */
const route             = express(); route.use(router);


/* ######################################################################## */
/* ################################ END ################################### */
/* ######################################################################## */


route.get('/', [ middleware.auth.isValid, middleware.user.get ], (req, res) => {
  
    var templateData = {
      user: req.user
    };

    eta.renderFile(path.join(viewsPath, 'sample_view'), templateData)
    .then(html => {
      res.status(200).send(html);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });

})


module.exports = route;