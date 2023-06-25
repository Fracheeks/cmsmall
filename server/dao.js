'use strict';
/* Data Access Object (DAO) module for accessing questions and answers */

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

// open the database
const db = new sqlite.Database('pages.db', (err) => {
  if(err) throw err;
});


exports.getPage = (pageId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT pages.*, users.name AS authorName FROM pages JOIN users ON pages.authorId = users.id WHERE pages.id = ?';
    db.get(sql, [pageId], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({error: 'Page not found.'});
      } else {
        resolve(row);
      }
    });
  });
};

exports.getComponents = (pageId) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT components.*, images.url AS url , images.name AS description FROM components LEFT JOIN images ON components.imageId = images.id WHERE components.pageId = ?';
      db.all(sql, [pageId], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        if (rows == undefined) {
          resolve({error: 'components not found.'});
        } else {
          resolve(rows);
        }
      });
    });
  };

  exports.getImages = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM images';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        if (rows == undefined) {
          resolve({error: 'components not found.'});
        } else {
          resolve(rows);
        }
      });
    });
  };
  
  exports.getPages = (filter, userId) => {
    return new Promise((resolve, reject) => {
      let sql;
      let params;
  
      switch (filter) {
        case "published":
          sql = 'SELECT pages.*, users.name AS authorName FROM pages JOIN users ON pages.authorId = users.id WHERE pages.status = ?';
          params = [filter]
          break;
        case "all" :
          sql ='SELECT pages.*, users.name AS authorName FROM pages JOIN users ON pages.authorId = users.id '
          break;
        default:
        sql = 'SELECT pages.*, users.name AS authorName FROM pages JOIN users ON pages.authorId = users.id WHERE pages.status = ? AND athorId = ?';
          ;
          params = [filter, userId];
          break;
      }
  
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  };
  

      exports.createPage = (page) => {
          // Sets the publication date to null if it was not provided
          if (page.publicationDate == "") {
              page.publicationDate = null;
          }
          return new Promise((resolve, reject) => {
              const sql = 'INSERT INTO pages (authorId, title, creationDate, publicationDate, status ) VALUES(?, ?, ?, ?, ?)';
              db.run(sql, [page.authorId, page.title, page.creationDate, page?.publicationDate, page.status], function (err) {
                  if (err) {
                      reject(err);
                  }
                  page.id = this.lastID;
                  resolve(page);
              });
          });
      };
      
      exports.createComponents = (content) => {
          for (const element of content) {
              if (element.content == "") {
                  element.content = null;
              }
              if (element.imageId == "") {
                  element.imageId = null;
              }
          }
          return Promise.all(content.map((element) => {
              const sql = 'INSERT INTO components (pageId, orderId, type, content, imageId) VALUES (?, ?, ?, ?, ?)';
              const values = [element.pageId, element.orderId, element.type, element.content, element.imageId];
              return new Promise((resolve, reject) => {
                  db.run(sql, values, function (err) {
                      if (err) {
                          reject(err);
                      }
                      resolve(element);
                  });
              });
          })
          );
      };

exports.deletePage = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM pages WHERE id=?';
        db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            }   
            resolve(null);
            
        });
    });
}

exports.deleteComponents = (pageId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM components WHERE pageId=?';
        db.run(sql, [pageId], function (err) {
            if (err) {
                reject(err);
            }
            else
                resolve(null);
        });
    });
}

exports.updatePage = (page) => {
    if (page.publicationDate == "") {
        page.publicationDate = null;
    }
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE pages SET authorId=?, title=?, creationDate=?, publicationDate=?, status=? WHERE id=?';
        db.run(sql, [page.authorId, page.title, page.creationDate, page.publicationDate, page.status, page.pageId], function (err) {
            if (err) {
                reject(err);
            }
            resolve(page);
        });
    });
};

exports.setAuthor = (pageId,authorId) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE pages SET authorId=? WHERE id=?';
    db.run(sql, [authorId, pageId], function (err) {
        if (err) {
            reject(err);
        }
        resolve(authorId);
    });
});
};

exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users';
    db.all(sql, [], function (err, rows) {
        if (err) {
            reject(err);
        }
        resolve(rows);
    });
});
};

exports.getAppName = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT name FROM application';
    db.get(sql, [], function (err, row) {
        if (err) {
            reject(err);
        }
        resolve(row);
    });
});
};

exports.setAppName = (name) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE application SET name=? ';
    db.run(sql, [name], function (err, row) {
        if (err) {
            reject(err);
        }
        resolve();
    });
});
};

