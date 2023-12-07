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
        let invoices = []
        if (res.locals.user.role === "dev") {
            invoices = await Invoice.findAll({
                where: {
                    devId: res.locals.user.id
                },
                attributes: ["id","invoice_date", 'amount', 'payment_method', "projectId", "clientId"],
            })
        } else if (res.locals.user.role === "client") {
            invoices = await Invoice.findAll({
                where: {
                    clientId: res.locals.user.id
                },
                attributes: ["id","invoice_date", 'amount', 'payment_method', "projectId", "devId"],
            })
        }

        if (invoices) {
            const message = `Hi ${res.locals.user.first_name}! These are your invoices:`
            return res.status(200).json({ message, invoices })
        } else {
            return res.status(404).send('Invoices not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const getOneOwnInvoice = async (req, res) => {
    try {
        let invoice;

        if (res.locals.user.role === "dev") {
            invoice = await Invoice.findOne({
                where: {
                    id: req.params.invoiceId,
                    devId: res.locals.user.id,
                },
                attributes: ["id","invoice_date", 'amount', 'payment_method', "projectId", "clientId"],
            });
        } else if (res.locals.user.role === "client") {
            invoice = await Invoice.findOne({
                where: {
                    id: req.params.invoiceId,
                    clientId: res.locals.user.id,
                },
                attributes: ["id","invoice_date", 'amount', 'payment_method', "projectId", "devId"],
            });
        }

        if (invoice) {
            const message = `Hi ${res.locals.user.first_name}! This is your invoice:`;
            return res.status(200).json({ message, invoice });
        } else {
            return res.status(404).send('Invoice not found or not associated with the user');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createInvoice = async (req, res) => {
    try {
        const { userId, projectId, invoice_date, amount, payment_date, payment_method } = req.body

        const invoice = await Invoice.create({
            devId: devId,
            clientId: clientId,
            projectId: projectId,
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
            devId: req.body.devId,
            clientId: req.body.clientId,
            projectId: req.body.projectId,
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