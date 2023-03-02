import express from "express";
import { allBrandFunction } from "../Controller/brandController.js";
import { allRestFunction } from "../Controller/restController.js";
import { allUserFunction } from "../Controller/userController.js";
import { allMTFunction } from "../Controller/menutypeController.js";
import { allMenuFunction } from "../Controller/menuController.js";
import { allCatFunction } from "../Controller/catController.js";
import { MenuFunction } from "../Controller/AllmenuController.js";
import fs from "fs";
import dbPath from "../jsonFiles/pwssc91957.json" assert { type: "json" };
import { fileURLToPath } from "url";
import path from "path";
import { scanLedger } from "../Controller/scanLedger.js";

const router = express.Router();

router.post("/users", (req, res) => {
  allUserFunction(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.post("/brand", (req, res) => {
  allBrandFunction(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
router.post("/rest", (req, res) => {
  allRestFunction(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
router.post("/menutype", (req, res) => {
  allMTFunction(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
router.post("/cat", (req, res) => {
  allCatFunction(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
router.post("/menu", (req, res) => {
  allMenuFunction(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});
router.post("/allmenu", (req, res) => {
  MenuFunction(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      console.log(result, "resultttt");
      const restaurants = [];
      const menu = [];

      result.forEach((result) => {
        // Check if the current restaurant already exists in the restaurants array
        const existingRestaurant = restaurants.find(
          (restaurant) => restaurant.id === result.restid
        );

        // If the restaurant doesn't exist, create a new restaurant object and add it to the restaurants array
        if (!existingRestaurant) {
          const newRestaurant = {
            id: result.restid,
            name: result.rest,
            brand: result.brand,
            rank:result.rank1,
            status: result.status1,
            cUser:result.cUser,
            url:`https://menu-master.netlify.app/?id=${result?.restcode}`,
            plan: {
              plan_id: result.plan_id,
              plan_name: result.plan_name,
              plan_expiry: result.plan_expiry,
            },
          };
          restaurants.push(newRestaurant);
        }

        // Check if the current menu type already exists in the menu array
        const existingMenuType = menu.find(
          (type) => type.type_id === result.mtid
        );

        // If the menu type doesn't exist, create a new menu type object and add it to the menu array
        if (!existingMenuType) {
          const newMenuType = {
            type_id: result.mtid,
            type_name: result.menutype,
            arr_cat: [],
          };
          menu.push(newMenuType);
        }

        // Find the existing menu type object in the menu array
        const currentMenuType = menu.find(
          (type) => type.type_id === result.mtid
        );

        // Check if the current category already exists in the current menu type
        const existingCategory = currentMenuType.arr_cat.find(
          (cat) => cat.cat_id === result.catid
        );

        // If the category doesn't exist, create a new category object and add it to the current menu type
        if (!existingCategory) {
          const newCategory = {
            cat_id: result.catid,
            cat_name: result.cat,
            cat_image: result.CImage,
            arr_items: [],
          };
          currentMenuType.arr_cat.push(newCategory);
        }

        // Find the existing category object in the current menu type
        const currentCategory = currentMenuType.arr_cat.find(
          (cat) => cat.cat_id === result.catid
        );

        // Create a new item object and add it to the current category
        const newItem = {
          id: result.menuid,
          name: result.menu,
          typeid: result.mtid,
          vegid: result.veg,
          spiceid: result.spice,
          description: result.description,
          ingredients: result.ingredients,
          price: result.price,
          image: result.MImage,
        };
        currentCategory.arr_items.push(newItem);
      });

      // Create the final object with the separated restaurant and menu arrays
      const modifiedResult = {
        data: {
          restaurant: restaurants,
          menu: menu,
        },
      };

      res.status(200).send(modifiedResult);
      const jsonData = JSON.stringify(modifiedResult);

      const data = result[0]?.restcode;
      console.log(data, "datataaa");

      fs.writeFile(`jsonFiles/${data}.json`, jsonData, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("JSON data has been saved to data.json");
        }
      });
      console.log(result, "rescodeeeee");
    }
  });
});

// router.post("/publish",(req,res)=>{

//   let data= req.body.hi

//   console.log(req.body.hi)

//   fs.writeFile(`${data}.json`, JSON.stringify({"hello":"hii"}), (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(`JSON data has been saved to ${data}.json`);
//     }
//   });
// import { readdir } from 'fs/promises';

// async function listFiles() {
//   try {
//     const files = await readdir('/assets/photos/');
//     console.log(files);
//   } catch (error) {
//     console.error(error);
//   }
// }

// listFiles();

//   res.send(req.body)

// })

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const directoryPath = path.join(__dirname, "../jsonFiles");

// fs.readdir(directoryPath, (error, files) => {
//   if (error) {
//     console.error("Error reading directory:", error);
//     return;
//   }
//   console.log("Files in directory:", files);
//   files.forEach((item) => {
//     console.log(item);
//     let id = item.split(".")[0];
//     router.get(`/allmenucustomer?r=${id}`, (req, res) => {
//       res.send(JSON.stringify(dbPath));
//       // res.send(JSON.stringify(`../jsonFiles/${id}.json`));
//     });
//   });
// });

router.get(`/allmenucustomer`, (req, res) => {
  // const queryParams = new URLSearchParams(window.location.search);
  const id = req.query.id;
  console.log("id is", id);
  // res.send(JSON.stringify(dbPath));
  // res.send(JSON.stringify(`../jsonFiles/${id}.json`assert { type: "json" }));
  res.sendFile(path.join(__dirname, '../jsonFiles', id + '.json'))
});

router.post("/onscan", scanLedger)

export default router;
