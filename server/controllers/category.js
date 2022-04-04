const slugify = require('slugify');

const Category = require('../models/category');
const Link = require('../models/link');
const {uploadNewImage, uploadUpdatedImage, deleteImage} = require('../utils/image/upload/imageService')

exports.save = (req, res) => {
    const { _id } = req.body;

    if(_id) {
        update(req, res);
   }
   else {
        create(req, res);
   }
}

const create =  (req, res) => {
    const {name, image, imageURI, content} = req.body; 
    const slug = slugify(name); 

    console.log('create');
    console.log(imageURI);

    //upload image
    uploadNewImage(imageURI)
    .then(uploadedImage => {
        //create category object
        let category = new Category({name, content, slug});
        
        category.image.url = uploadedImage.location;
        category.image.key = uploadedImage.key;
        category.postedBy = req.user._id;

        console.log({category});
        //save to DB
        category.save((err, newCategory) => {

            if(err) res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Unable to save category'});

            return res.json(newCategory);
        })
    })
    .catch(err => {console.log(err);})
 
};

const update = (req, res) => {
     const { _id, name, image, imageURI, content } = req.body;
 
     console.log('update');
    console.log(image);
    console.log(imageURI);

    Category.findOneAndUpdate({ _id }, { name, content }, { new: true }).exec((err, updated) => {
        if(err) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Save category to DB is failed'});
  
        console.log('findOneAndUpdate');
        console.log(updated);
        console.log(image);

        if (imageURI) {  

            uploadUpdatedImage(imageURI, updated.image.key)
            .then(uploadedImage => {

                //update category object 
                updated.image.url = uploadedImage.location;
                updated.image.key = uploadedImage.key;
         
                // save to db
                updated.save((err, success) => {
                    console.log('err findOneAndUpdate', err);

                    if(err) res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Save image in DB is failed'});
                    else res.json(success);
                });
            })
            .catch(err => {console.log(err);})
  
        } else {
            res.json(updated);
        }
    });
};
   
exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if(err) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Category could not load'});

        res.json(data);
    })
}

exports.read = (req, res) => {
    const { categorySlug } = req.params;
    let limit = req.body.limit ? parseInt(req.body.limit) : 0  ;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0 ;
 
    Category.findOne({slug: categorySlug})
        .populate('postedBy', '_id name username')
        .exec((err, category) => {
             if(err) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Category could not be found'});

            Link.find({ categories: category}) 
                .populate('postedBy', '_id name username')
                .populate('categories', 'name')
                .sort({createdAt: -1})
                .limit(limit)
                .skip(skip)
                .exec((err2, links) => {
                    if(err2) return res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Link of related category could not be found'});
 
                    res.json({category, links})
                })
             
        })
}

exports.remove = async (req, res) => {

    const { id } = req.params;

    console.log(`remove ${id}`);

    Category.findOneAndRemove({ _id: id }).exec((err, data) => {
        if(err) res.status(process.env.APPLICATION_ERROR_CODE).json({error: 'Delete category in DB is failed'});
        else { 
            console.log(`data`);
            console.log(data);

            // remove the existing image from s3 before uploading new/updated one
           deleteImage(data.image.key) 
           .then(res.json(data))
           .catch( (err) =>
               {console.log(err);}
           )
               
        }
    });
     
};