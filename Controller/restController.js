import { db } from "../db.js";

const create = (data, callback) => {

  const makeid=()=> {
    let number=Math.floor(Math.random()*90000) + 10000
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return `${result}`+`${number}`;
}
const restcode = makeid()

console.log(typeof(restcode))




db.query(
  `insert into rests (rest, userid, plan_id,plan_name , notes, favourite, status1, rank1, cUser, brandid,restcode) values (?,?,?,?,?,?,?,?,?,?,?)`,
  [
    data.rest,
    data.userid,
    data.plan_id,
    data.plan_name,
    data.notes,
    data.favourite,
    data.status1,
    data.rank1,
    data.cUser,
    data.brandid,
    restcode,
  ],
  (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  }
);
};

const getAllRests = (data, callback) => {
  console.log("data received", data.userid);
  db.query(
    `SELECT 
    rests.restid, 
    rests.rest, 
    rests.status1,
    rests.RImage, 
    brands.brandid 
FROM users 
JOIN rests ON users.userid = rests.userid
JOIN brands ON rests.brandid = brands.brandid
WHERE rests.status1 = 1 
    AND users.userid = ?
    AND brands.brandid = ?
   ;
    `,
    [data.userid, data.brandid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};
const updateRest = (data, callback) => {
  console.log(data, "dataaa");
  db.query(
    `update rests set rest=? where restid=?`,
    [data.rest, data.restid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteRest = (data, callback) => {
  db.query(
    `update rests set status1=9 where restid=?`,
    [data.restid],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

export const allRestFunction = (data, callback) => {
  console.log("Action given is", data);

  switch (data.action) {
    case "create":
      console.log("Create hit");
      create(data, callback);
      break;
    case "read":
      console.log("Read hit");
      getAllRests(data, callback);
      break;
    case "update":
      console.log("Update hit");
      updateRest(data, callback);
      break;
    case "delete":
      console.log("Delete hit");
      deleteRest(data, callback);
      break;
    default:
      let results = "Provide valid action";
      return callback(null, results);
  }
};
