import Cat from '../models/Cat.js';

class SiteController {
    //[GET] home index
     async index(req, res, next){
        await Cat.find({}).lean()
            .then(cat => res.render('home', { cat: cat }))
            .catch(next);
    }
    //[GET] list index
    // async list(req, res, next){
    //     await Cat.find({}).lean()
    //         .then(cat => res.render('cat/list', { cat: cat }))
    //         .catch(next);
    // }
    async list(req, res, next) {
        try {
            let page = parseInt(req.query.page) || 1;  // Default to page 1
            let pageSize = 5;  // Number of records per page
            let skip = (page - 1) * pageSize;

            let totalCount = await Cat.countDocuments();
            let totalPages = Math.ceil(totalCount / pageSize);

            let cat = await Cat.find({}).skip(skip).limit(pageSize).lean();

            // Calculate start and end index
            let startIndex = skip + 1;
            let endIndex = Math.min(skip + pageSize, totalCount);

            res.render('cat/list', {
                cat: cat,
                currentPage: page,
                pageSize: pageSize,   // Ensure this is passed to the view
                totalPages: totalPages,
                totalCount: totalCount,
                startIndex: startIndex,
                endIndex: endIndex
            });
        } catch (err) {
            next(err);
        }
    }


    //[GET] home show details
    async show(req, res, next){
       await Cat.findOne({slug:req.params.slug}).lean()
            .then(cat => res.render('cat/show', { cat: cat }))
            .catch(next);
    }

    //[GET] /create
    create(req, res, next){
        res.render('cat/create');
    }

    //[post] /store
    async store(req, res, next) {
        try {

            // Check if an image was uploaded
            const imagePath = req.file ? `uploads/${req.file.filename}` : null;

            // Create a new Cat object
            const cat = new Cat({
                name: req.body.name,
                color: req.body.color,
                eyes: req.body.eyes,
                description: req.body.description,
                image: imagePath, // Set image only if uploaded
                video: req.body.video
            });

            await cat.save();
            res.redirect('/cat/list');
        } catch (err) {
            console.error("Error saving cat:", err);
            next(err); // Pass error to Express error handler
        }
    }

    //[Get] /:id/edit
    edit (req, res, next){
         Cat.findById(req.params.id).lean()
             .then(cat => res.render('cat/edit', { cat : cat }))
             .catch(next);
    }

    //[update] cat/:id
    update (req, res, next){
        Cat.updateOne({_id: req.params.id}, req.body)
        .then(() => res.redirect('/cat/list'))
        .catch(next);
    }

    //[delete] cat/:id
    delete(req, res, next) {
        Cat.deleteOne({ _id: req.params.id })
            .then(() => res.json({ success: true, message: "Deleted successfully" }))
            .catch(err => res.status(500).json({ success: false, message: "Error deleting", error: err }));
    }

    //[delete] cat/delete-all
    deleteAll(req, res, next) {

        const { ids } = req.body;
        if (!ids || ids.length === 0) {
            return res.status(400).json({ success: false, message: "No items selected" });
        }

        Cat.deleteMany({ _id: { $in: ids } })
            .then(() => res.json({ success: true, message: "Deleted successfully" }))
            .catch(err => {
                console.error("Delete Error:", err);
                res.status(500).json({ success: false, message: "Error deleting", error: err });
            });
    }
}

export default new SiteController();