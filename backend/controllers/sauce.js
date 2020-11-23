const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const url = req.protocol + '://' + req.get('host');
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: url + '/images/' + req.file.filename,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
    });
    console.log(sauce)
    sauce.save()
        .then(
            () => {
                res.status(201).json({
                    message: 'Post saved successfully!'
                });
            }
        ).catch(
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
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
    let sauce = new Sauce({ _id: req.params._id });
    const sauceObject = JSON.parse(req.body.sauce);
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        sauce = {
            imageUrl: url + '/images/' + req.file.filename,
            ...sauceObject
        }
    } else {
        sauce = {
            // imageUrl: req.body.imageUrl,
            ...sauceObject
        };
    }
    Sauce.updateOne({_id: req.params.id}, sauce).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}).then(
        (sauce) => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
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