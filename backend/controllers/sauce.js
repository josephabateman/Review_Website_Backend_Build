const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({

        ...sauceObject,
        // name: sauceObject.name,
        imageUrl: url + '/images/' + req.file.filename,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
    });
    console.log(sauce.name)
    sauce.save()
        .then(
            () => {
                res.status(201).json({
                    message: 'Post saved successfully!'
                });
            }
        )
        .catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  })
  .then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  )
  .catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const updatedSauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
    const newSauce = {
        ...updatedSauce,
        // name: updatedSauce.name,
    }

    //if no new image is uploaded, I want to keep the old one. Can not figure this out!
    let updatedUrl
    if (req.file) {
      updatedUrl = url + '/images/' + req.file.filename
    } else {
      updatedUrl = 'the old image'
    }

    Sauce.findByIdAndUpdate({_id: req.params.id}, { $set: updatedSauce, imageUrl: updatedUrl}, {new: true})
        .then(
            () => {
                res.status(201).json({
                    message: 'Sauce updated successfully!'
                });
            }
        )
        .catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({_id: req.params.id})
                    .then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                )
                .then(console.log('id:' + req.params.id + ' deleted'))
                .catch(
                (error) => {
                    res.status(400).json({
                        error: error
                        });
                    }
                );
            });
        }
    );
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};