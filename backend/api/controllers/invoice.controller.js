const Invoice = require("../models/invoice.model")

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll({
            where: req.query
        })
        if (invoices) {
            return res.status(200).json(invoices)
        } else {
            return res.status(404).send("No invoices found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.invoiceId)
        if (invoice) {
            return res.status(200).json(invoice)
        } else {
            return res.status(404).send("Invoice not found")
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const getOwnInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll({
            where: {
                userId: res.locals.user.id
            }
        })
        if (invoices) {
            return res.status(200).json(invoices)
        } else {
            return res.status(404).send('Invoice not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneOwnInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.invoiceId, {
            where: {
                userId: res.locals.user.id
            }
        })
        if (invoice) {
            return res.status(200).json(invoice)
        } else {
            return res.status(404).send('Invoice not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const createInvoice = async (req, res) => {
    try {
        const { userId, projectID, invoice_date, amount, payment_date, payment_method } = req.body

        const invoice = await Invoice.create({
            userId: userId,
            projectID: projectID,
            invoice_date: invoice_date,
            amount: amount,
            payment_date: payment_date,
            payment_method: payment_method,
        })

        return res.status(200).json({ message: 'Invoice created', invoice: invoice })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const updateInvoice = async (req, res) => {
    try {
        const [invoice] = await Invoice.update({
            userId: req.body.userId,
            projectID: req.body.projectID,
            invoice_date: req.body.invoice_date,
            amount: req.body.amount,
            payment_date: req.body.payment_date,
            payment_method: req.body.payment_method,

        }, {
            where: {
                id: req.params.invoiceId
            }
        })

        if (invoice) {
            return res.status(200).json({ message: 'Invoice updated' })
        } else {
            return res.status(404).send('Invoice not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.destroy({
            where: {
                id: req.params.invoiceId
            }
        })

        if (invoice) {
            return res.status(200).json({ message: 'Invoice deleted' })
        } else {
            return res.status(404).send('Invoice not found')
        }

    } catch (error) {
        return res.status(500).send(error.message)

    }
}

module.exports = {
    getAllInvoices,
    getOneInvoice,
    getOwnInvoices,
    getOneOwnInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice
}