const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

router.get("/", (req, res) => {

    res.render("pages/index", {
        erros: null,
        resultado: null,
        valores: { salario: "" }
    });

});

router.post(

    "/classificar",

   
    body("salario")
        .isFloat({ min: 0.01 })
        .withMessage("Digite um salário válido maior que zero."),

    (req, res) => {

       
        const errors = validationResult(req);

       
        if (!errors.isEmpty()) {

            return res.render("pages/index", {
                erros: errors,
                resultado: null,
                valores: req.body
            });

        }

        let salario = parseFloat(req.body.salario);

        let percentual = 0;

     
        if (salario <= 1400) {

            percentual = 15;

        } else if (salario > 1400 && salario <= 4500) {

            percentual = 10;

        } else if (salario > 4500 && salario <= 10000) {

            percentual = 7.5;

        } else {

            percentual = 5;

        }

      
        let valorAumento = salario * (percentual / 100);

        let novoSalario = salario + valorAumento;

       
        let objJson = {

            salario: salario.toFixed(2),

            percentual: percentual,

            aumento: valorAumento.toFixed(2),

            novoSalario: novoSalario.toFixed(2)

        };

      
        return res.render("pages/index", {

            erros: null,

            resultado: objJson,

            valores: req.body

        });

    }

);

module.exports = router;