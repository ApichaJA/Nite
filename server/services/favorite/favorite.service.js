const Favorite = require("../../models/favorite");

const getFav = ({ uuid }) => {
  return new Promise((resolve, reject) => {
    Favorite.find({ uuid })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

const new_fav = ({ nid, uuid }) => {
  return new Promise((resolve, reject) => {
    const create_fav = new Favorite({
      nid,
      uuid
    });
    create_fav
      .save()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

const deleteFav = ({ uuid, nid }) => {
  return new Promise((resolve, reject) => {
    Favorite.find({ uuid, nid })
      .deleteOne()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};


module.exports = {
  getFav,
  new_fav,
  deleteFav
};
