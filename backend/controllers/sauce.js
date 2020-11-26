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

// exports.modifySauce = (req, res, next) => {
//     if (req.file) {
//         const updatedSauce = JSON.parse(req.body.sauce);
//         const url = req.protocol + '://' + req.get('host');
//         const updatedUrl = url + '/images/' + req.file.filename;
//         // fs.unlink('images/' + req.file.filename, (err) => {
//         //     if (err) throw err;
//         //     console.log('old image deleted');
//         // });
//         Sauce.findByIdAndUpdate({_id: req.params.id}, { $set: updatedSauce, imageUrl: updatedUrl}, {new: true})
//             .then(() => res.status(201).json({ message: 'Sauce updated successfully!'}))
//             .catch(error => res.status(400).json({ error }));
//     } else {
//            const updatedSauce = {...req.body}
//         Sauce.updateOne({ _id: req.params.id }, { ...updatedSauce, _id: req.params.id })
//             .then(() => res.status(201).json({ message: 'Sauce updated successfully!'}))
//             .catch(error => res.status(400).json({ error }));
//     }
// 

exports.modifySauce = (req, res, next) => {
    if (req.file) {
        let oldFilename
        Sauce.findOne({_id: req.params.id}).then(
            (sauce) => {
                 oldFilename = sauce.imageUrl.split('/images/')[1];
                 console.log(oldFilename)
            }
        )

        const updatedSauce = JSON.parse(req.body.sauce);
        const url = req.protocol + '://' + req.get('host');
        const updatedUrl = url + '/images/' + req.file.filename;

        Sauce.findByIdAndUpdate({_id: req.params.id}, { $set: updatedSauce, imageUrl: updatedUrl}, {new: true}, () => {
            fs.unlink('images/' + oldFilename, (err) => {
                if (err) throw err;
                console.log('old image was deleted and replaced with new one');
                res.status(201).json({ message: 'Sauce updated successfully!'})
            });
        })
    } else {
        const updatedSauce = {...req.body}
        Sauce.updateOne({ _id: req.params.id }, { ...updatedSauce, _id: req.params.id })
            .then(() => res.status(201).json({ message: 'Sauce updated successfully!'}))
            .catch(error => res.status(400).json({ error }));
    }
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