const router = require("express").Router()

const { checkAdmin } = require("../middlewares/index")

const {
    getAllInvoices,
    getOneInvoice,
    getOwnInvoices,
    getOneOwnInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice
} = require("../controllers/invoice.controller")

router
    .get("/", checkAdmin, getAllInvoices)
    .get("/:invoiceId", checkAdmin, getOneInvoice)
    .get("/myInvoices", getOwnInvoices)
    .get("/myInvoices/:invoiceId", getOneOwnInvoice)
    .post("/", checkAdmin,createInvoice)
    .put("/:invoiceId", checkAdmin,updateInvoice)
    .delete("/:invoiceId", checkAdmin,deleteInvoice)
    
module.exports = router