import { db } from "../db.js";

const create = (data, callback) => {
  if (!data.cat || data.cat.trim() === "") {
    data.cat = "general";
  }
  
  db.query(
    `INSERT INTO cats 
    (cat, mtid, brandid, restid, userid, notes, CImage, favourite, status1, rank1, cUser) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE cat = cat`,
    [
      data.cat,
      data.mtid,
      data.brandid,
      data.restid,
      data.userid,
      data.notes,
      data.CImage,
      data.favourite,
      data.status1,
      data.rank1,
      data.cUser,
    ],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const getAllCats = (data, callback) => {
  console.log("data received", data);
  db.query(
    `SELECT 
    cats.catid,
    cats.cat, 
    cats.status1, 
    cats.CImage,
    rests.restid,
    rests.rest,
    brands.brandid,
    brands.brand,
    menutypes.mtid,
    menutypes.menutype
    FROM users 
    JOIN cats ON users.userid = cats.cUser 
    JOIN brands on users.userid = brands.cUser
    JOIN rests on cats.restid=rests.restid
    JOIN menutypes on cats.mtid=menutypes.mtid
    WHERE cats.status1=1 AND users.userid  = ? AND rests.restid  = ? AND brands.brandid  = ?
    AND menutypes.mtid  = ?
    `,
    [data.userid, data.restid, data.brandid, data.mtid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
const updateCats = (data, callback) => {
  console.log(data, "dataaa");
  db.query(
    `update cats set cat=? where catid=?`,
    [data.cat, data.catid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteCats = (data, callback) => {
  db.query(
    `update cats set status1=9 where catid=?`,
    [data.catid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
const defaultCats = (data, callback) => {
  db.query(
    `UPDATE cats SET catid = 1 WHERE cat = 'general'`,
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
export const allCatFunction = (data, callback) => {
  console.log("Action given is", data);

  switch (data.action) {
    case "create":
      console.log("Create hit in cat");
      create(data, callback);
      break;
    case "read":
      console.log("Read hit");
      getAllCats(data, callback);
      break;
    case "update":
      console.log("Update hit");
      updateCats(data, callback);
      break;
    case "delete":
      console.log("Delete hit");
      deleteCats(data, callback);
      break;
    case "defaultcats":
      console.log("Default cats hit");
      defaultCats(data, callback);
      break;
    default:
      let results = "Provide valid action";
      return callback(null, results);
  }
};
