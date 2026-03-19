const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});

router.use('/tasks', require('./tasks'));

module.exports = router;