import { db } from "../db.js";

const create = (data, callback) => {
  db.query(
    `insert into brands (brand,BImage,userid, notes, favourite, status1, rank1, cUser) values (?,?,?,?,?,?,?,?)`,
    [
      data.brand,
      data.BImage,
      data.userid,
      data.notes,
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

const getAllBrands = (data, callback) => {
  console.log("data received", data.id);
  db.query(
    `SELECT brands.brandid, brands.brand, brands.status1, brands.BImage FROM users 
    INNER JOIN brands ON users.userid = brands.userid WHERE brands.status1=1 AND users.userid  = ?;
    `,
    [data.userid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const updateBrand = (data, callback) => {
  console.log(data, "dataaa");
  db.query(
    `update brands set brand=? where brandid=? AND userid=?`,
    [data.brand, data.brandid, data.userid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteBrand = (data, callback) => {
  db.query(
    `update brands set status1=9 where brandid=? AND userid=?`,
    [data.brandid, data.userid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

export const allBrandFunction = (data, callback) => {
  console.log("Action given is", data);

  switch (data.action) {
    case "create":
      console.log("Create hit");
      create(data, callback);
      break;
    case "read":
      console.log("Read hit");
      getAllBrands(data, callback);
      break;
    case "update":
      console.log("Update hit");
      updateBrand(data, callback);
      break;
    case "delete":
      console.log("Delete hit");
      deleteBrand(data, callback);
      break;
    default:
      let results = "Provide valid action";
      return callback(null, results);
  }
};
