import { db } from "../db.js";




const getAllMenu = (data, callback) => {
  console.log("data received", data);
  db.query(
    `SELECT r.restid, r.cUser,r.brandid, r.rest,r.plan_id,r.plan_name,r.plan_expiry,mt.mtid, mt.menutype, mt.MTImage,c.catid, c.cat, me.menuid, me.menu,me.MImage,me.veg,me.spice,me.price,me.description,
    me.ingredients,me.favourite,me.status1,me.rank1,c.CImage,c.favourite,c.status1,c.rank1,c.notes,r.restcode,b.brand

    FROM rests r
    JOIN brands b ON r.brandid = b.brandid
     JOIN cats c ON r.restid = c.restid
    JOIN menus me ON c.catid = me.catid
     JOIN menutypes mt ON me.mtid = mt.mtid
    WHERE r.userid = ? and r.restid=?
    ORDER BY r.restid, mt.mtid, c.catid, me.menuid;
    `,
    [data.userid,data.restid],

    (error, results) => {
      if (error) {
        return callback(error);
      }
      // Write the results to a JSON file
    
      return callback(null, results);
    }
  );
};

export const MenuFunction = (data, callback) => {
  console.log("Action given is", data);

  switch (data.action) {
    case "build":
      console.log("build hit");
      getAllMenu(data, callback);
      break;

    default:
      let results = "Provide valid action";
      return callback(null, results);
  }
};