const Comment = require("../../models/comment");
const Account = require("../../models/account");

const getAllComment = (nid) => {
  return new Promise((resolve, reject) => {
    Comment.find({ nid })
      .then(async (comment) => {
        resolve(comment);
      })
      .catch(() => {
        reject("Not Found this note");
      });
  });
};

const getMyComment = (uuid, nid) => {
  return new Promise((resolve, reject) => {
    Comment.find(
      { "author.uuid": uuid, nid },
    ).sort({'updatedAt': -1}).all()
      .then(async (comment) => {
        resolve(comment);
      })
      .catch(() => {
        reject("Not Found this uuid");
      });
  });
};

const new_comment = (body) => {
  return new Promise((resolve, reject) => {
    const { nid, comment, uuid } = body;
    Account.findOne(
      { "account.uuid": uuid },
      {
        "account.password": 0,
      }
    )
      .then(async ({ profile }) => {
        // console.log(profile)
        const create_comment = new Comment({
          nid,
          comment,
          author: {
            uuid,
            firstname: profile.firstname,
            lastname: profile.lastname,
          },
        });
        create_comment
          .save()
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(new Error(err));
          });
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
};

module.exports = {
  new_comment,
  getAllComment,
  getMyComment,
};
