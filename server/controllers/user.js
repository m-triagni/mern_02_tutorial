const User = require('../models/user');
const Link = require('../models/link');

exports.read = (req, res) => {
    User.findOne({ _id: req.user._id }).exec((err, user) => {
        if (err) { return res.status(process.env.APPLICATION_ERROR_CODE).json({  error: 'User is not found'  });  }

        res.json({ user });

    });
};

exports.readWithLink = (req, res) => {
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
