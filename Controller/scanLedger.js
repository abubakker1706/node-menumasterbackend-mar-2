import { db } from "../db.js";



export const scanLedger =(req,res)=>{
    const q="INSERT INTO menumaster_scan_ledger(`restid`,`Device`,`Location`,`Status`,`Rank`,`CUser`,`CDate`) VALUES(?)";
    const values=[
      req.body.restid,
      req.body.Device,
      req.body.Location,
      req.body.Status,
      req.body.Rank,
      req.body.CUser,
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    ]
  
    db.query(q,[values],(err,data)=>{
      if(err) return res.json(err);        
      return res.json(data);
    });
  };