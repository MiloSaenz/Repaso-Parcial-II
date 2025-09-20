const carros = [
    { id: 1, marca: 'Toyota' },
    { id: 2, marca: 'Honda' },
    { id: 3, marca: 'Ford' },
];

// Views directory is configured as <project>/src/views in index.js,
// so use view names relative to that folder (no absolute paths or file extensions needed).
const index = (req, res) => {
    res.render('habitacion27/index27', { carros });
};

const show = (req, res) => {
    const { id } = req.params;
    const carro = carros.find(carro => carro.id == id);
    if (!carro) {
        return res.status(404).send('Carro no encontrado');
    }
    res.render('habitacion27/show27', { carro });
};

const create = (req, res) => {
    res.render('habitacion27/create27');
};

const store = (req, res) => {
    const { marca } = req.body || {};
    if (!marca || typeof marca !== 'string' || !marca.trim()) {
        // Simple validation — re-render the form with an error message.
        return res.status(422).render('habitacion27/create27', { error: 'Marca es requerida' });
    }

    const nuevoCarro = {
        id: carros.length ? carros[carros.length - 1].id + 1 : 1,
        marca: marca.trim()
    };
    carros.push(nuevoCarro);

    // Redirect to the resource root route (mounted at /habitacion27)
    res.redirect('/habitacion27');
};

module.exports = {
    index,
    show,
    create,
    store
};