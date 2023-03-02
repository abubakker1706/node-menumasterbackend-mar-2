import { db } from "../db.js";

const create = (data, callback) => {
  db.query(
    `insert into menutypes (menutype, brandid, restid, userid, notes, MTImage,favourite, status1, rank1, cUser) values (?,?,?,?,?,?,?,?,?,?)`,
    [
      data.menutype,
      data.brandid,
      data.restid,
      data.userid,
      data.notes,
      data.MTImage,
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

const getAllMenuTypes = (data, callback) => {
  console.log("data received", data);
  db.query(
    `SELECT 
    menutypes.mtid,
    menutypes.menutype, 
    menutypes.MTImage, 
    menutypes.status1, 
    rests.restid,
    rests.rest,
    brands.brandid,
    brands.brand
    FROM users 
    JOIN menutypes ON users.userid = menutypes.cUser 
    JOIN brands on users.userid = brands.cUser
    JOIN rests on menutypes.restid=rests.restid
    WHERE menutypes.status1=1 AND users.userid  = ? AND rests.restid  = ? AND brands.brandid  = ?;
    `,
    [data.userid, data.restid, data.brandid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
const updateMenuTypes = (data, callback) => {
  console.log(data, "dataaa");
  db.query(
    `update menutypes set menutype=? where mtid=?`,
    [data.menutype, data.mtid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteMenuTypes = (data, callback) => {
  db.query(
    `update menutypes set status1=9 where mtid=?`,
    [data.mtid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

export const allMTFunction = (data, callback) => {
  console.log("Action given is", data);

  switch (data.action) {
    case "create":
      console.log("Create hit");
      create(data, callback);
      break;
    case "read":
      console.log("Read hit");
      getAllMenuTypes(data, callback);
      break;
    case "update":
      console.log("Update hit");
      updateMenuTypes(data, callback);
      break;
    case "delete":
      console.log("Delete hit");
      deleteMenuTypes(data, callback);
      break;
    default:
      let results = "Provide valid action";
      return callback(null, results);
  }
};
