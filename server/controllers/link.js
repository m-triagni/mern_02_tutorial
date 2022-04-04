const Link = require('../models/link');
const User = require('../models/user');
const Category = require('../models/category');

const slugify = require('slugify');

exports.save = (req, res) => {
    const { _id } = req.body;

    if(_id) {
         update(req, res);
    }
    else {
         create(req, res);
    }
}

const create = (req, res) => {
    const { title, url, categories, type, medium, difficulty, description } = req.body;
    const slug = url;
 
    let link = new Link({ title, url, categories, type, medium, slug, difficulty,  description});
    link.postedBy = req.user._id;

    //save
    link.save((err, data) =>  {
        if(err) res.status(process.env.APPLICATION_ERROR_CODE).json({error: err})

        res.json(data);
    })
};

const update = (req, res) => {
    const { _id, title, url, description,  type,  medium , difficulty, categories } = req.body;
    const updatedLink = { title, url, description,  type,  medium , difficulty, categories};

    Link.findOneAndUpdate({ _id }, updatedLink, { new: true }).exec((err, updated) => {
        if (err) { return res.status(process.env.APPLICATION_ERROR_CODE).json({  error: 'Update link in DB is error'  });  }

        res.json(updated);
    });
};

exports.list = (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 0  ;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0 ;

    Link.find({})
    .populate('postedBy', '_id name username')
    .populate('categories', 'name')
    .sort({createdAt: -1})
    .limit(limit)
    .skip(skip)
    .exec((err, data) => {
        if(err) res.status(process.env.APPLICATION_ERROR_CODE).json({error: err})

        res.json(data);
    }); 
};

exports.listByUser = (req, res) => {
    User.findOne({ _id: req.user._id }).exec((err, user) => {

        if (err) { return res.status(process.env.APPLICATION_ERROR_CODE).json({  error: 'User is not found'  });  }

        Link.find({ postedBy: user })
            .populate('categories', 'name slug')
            .populate('postedBy', 'name')
            .sort({ createdAt: -1 })
            .exec((err, links) => {
                if (err) { return res.status(process.env.APPLICATION_ERROR_CODE).json({  error: 'Link in the user is not found'  });  }

                user.hashed_password = undefined;
                user.salt = undefined;

                res.json({ user, links });
            });
    });
};
 
exports.read = (req, res) => {
    const { id } = req.params;
    Link.findOne({ _id: id }).exec((err, data) => {
        if (err) { return res.status(process.env.APPLICATION_ERROR_CODE).json({  error: 'Read link from DB is error'  });  }

        res.json(data);
    });
};

exports.remove = (req, res) => {
    const { id } = req.params;
 
    console.log(`remove ${id}`);

    Link.findOneAndRemove({ _id: id }).exec((err, data) => {
        if (err) { return res.status(process.env.APPLICATION_ERROR_CODE).json({  error: 'Delete link in DB is error'  });  }

        res.json({
            message: 'Link removed successfully'
        });
    });
};

exports.updateClickCount = (req, res) => {
    const { linkId } = req.body;
    Link.findByIdAndUpdate(linkId, { $inc: { clicks: 1 } }, { upsert: true, new: true }).exec((err, data) => {
        if(err) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Link increase count could not be saved'});

        res.json(data);
    });
};

exports.popular = (req, res) => {
    Link.find()
        .populate('postedBy', 'name')
        .populate('categories', 'name')
        .sort({ clicks: -1 })
        .limit(3)
        .exec((err, links) => {
            if(err) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Popular links could not be found'});

            res.json(links);
        });
};

exports.popularInCategory = (req, res) => {
    const { slug } = req.params;

    Category.findOne({ slug }).exec((err, category) => {
        if(err) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: `Category for popular link could not be found`});

        Link.find({ categories: category })
            .sort({ clicks: -1 })
            .limit(5)
            .exec((err, links) => {
                if(err) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: `Popular links in the ${slug} could not be found`});

                res.json(links);
            });
    });
};

exports.newest = (req, res) => {
    Link.find()
        .populate('postedBy', 'name')
        .populate('categories', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
        .exec((err, links) => {
            if(err) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Newest links could not be found'});

            res.json(links);
        });
}