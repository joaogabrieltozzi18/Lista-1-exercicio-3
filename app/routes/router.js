const express = require("express");
const router = express.Router();
 
router.get("/", (req, res)=>{
      res.render("pages/index",{"resultado":null,"valores":{"sal":"digite o seu sal"}});  
});
 
 
router.post("/sal", (req, res)=>{
 
    let salario = parseInt(req.body.sal);
    let percentual;
 
if(salario <= 1400){
    percentual = 0.15;
}else if(salario > 1400 && salario <= 4500){
    percentual = 0.10;
}else if(salario >  4500 && salario <= 10000){
    percentual = 0.075;
}else if (salario > 10000){
    percentual = 0.5
};
 
let aumento = salario * percentual ;
let novoSalario = salario + aumento;
 
 
 
    let objJson = {"sal":salario,"percentual":percentual, "aumento":aumento, "novoSalario":novoSalario}
 
    res.render("pages/index", {"resultado":objJson,"valores":{"sal":req.body.sal}})
 
});
 
 
 
 
 
module.exports = router;
 
 