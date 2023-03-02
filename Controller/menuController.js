import { db } from "../db.js";

const create = (data, callback) => {
  db.query(
    `insert into menus
    (menu,mtid,brandid,restid,catid,userid, notes, MImage,veg,spice,price,description,ingredients,favourite, status1, rank1, cUser) 
    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.menu,
      data.mtid,
      data.brandid,
      data.restid,
      data.catid,
      data.userid,
      data.notes,
      data.MImage,
      data.veg,
      data.spice,
      data.price,
      data.description,
      data.ingredients,
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

const getAllMenu = (data, callback) => {
  console.log("data received", data.userid);
  db.query(
    `SELECT 
    menus.menuid, 
    menus.menu,
    menutypes.menutype,
    menutypes.mtid,
    rests.rest, 
    menus.status1, 
    brands.brandid,
    brands.brand
    FROM users 
    JOIN menus ON users.userid = menus.userid 
    JOIN brands on users.userid = brands.cUser
    JOIN rests on menus.restid=rests.restid
    JOIN menutypes on menus.mtid=menutypes.mtid
    WHERE menus.status1=1 AND users.userid  = ? AND rests.restid  = ? AND brands.brandid  = ?
    AND menutypes.mtid  = ? AND menus.menuid  = ?
    `,
    [data.userid, data.restid, data.brandid, data.mtid, data.menuid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
const updateMenu = (data, callback) => {
  console.log(data, "dataaa");
  db.query(
    `update menus set menu=? where menuid=?`,
    [data.menu, data.menuid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteMenu = (data, callback) => {
  db.query(
    `update menus set status1=9 where menuid=?`,
    [data.menuid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

export const allMenuFunction = (data, callback) => {
  console.log("Action given is", data);

  switch (data.action) {
    case "create":
      console.log("Create hit");
      create(data, callback);
      break;
    case "read":
      console.log("Read hit");
      getAllMenu(data, callback);
      break;
    case "update":
      console.log("Update hit");
      updateMenu(data, callback);
      break;
    case "delete":
      console.log("Delete hit");
      deleteMenu(data, callback);
      break;
    default:
      let results = "Provide valid action";
      return callback(null, results);
  }
};
