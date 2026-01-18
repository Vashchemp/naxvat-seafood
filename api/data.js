const { readData, writeData } = require('./db');

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const data = readData();

        if (req.method === 'GET') {
            res.status(200).json(data);
        } else if (req.method === 'POST') {
            const { action, payload } = req.body;

            if (action === 'addProduct') {
                const newProduct = { id: Date.now(), ...payload };
                data.products.push(newProduct);
                writeData(data);
                res.status(200).json({ success: true, product: newProduct });
            } else if (action === 'updateProduct') {
                const index = data.products.findIndex(p => p.id === payload.id);
                if (index !== -1) {
                    data.products[index] = payload;
                    writeData(data);
                    res.status(200).json({ success: true });
                }
            } else if (action === 'deleteProduct') {
                data.products = data.products.filter(p => p.id !== payload.id);
                writeData(data);
                res.status(200).json({ success: true });
            } else if (action === 'addSale') {
                const newSale = { id: Date.now(), ...payload };
                data.sales.push(newSale);
                writeData(data);
                res.status(200).json({ success: true, sale: newSale });
            } else if (action === 'updateSale') {
                const index = data.sales.findIndex(s => s.id === payload.id);
                if (index !== -1) {
                    data.sales[index] = payload;
                    writeData(data);
                    res.status(200).json({ success: true });
                }
            } else if (action === 'addDelivery') {
                const newDelivery = { id: Date.now(), ...payload };
                data.deliveries.push(newDelivery);
                writeData(data);
                res.status(200).json({ success: true, delivery: newDelivery });
            } else if (action === 'updateDelivery') {
                const index = data.deliveries.findIndex(d => d.id === payload.id);
                if (index !== -1) {
                    data.deliveries[index] = payload;
                    writeData(data);
                    res.status(200).json({ success: true });
                }
            } else if (action === 'addShipment') {
                const newShipment = { id: Date.now(), ...payload };
                data.shipments.push(newShipment);
                writeData(data);
                res.status(200).json({ success: true, shipment: newShipment });
            } else if (action === 'updateShipment') {
                const index = data.shipments.findIndex(s => s.id === payload.id);
                if (index !== -1) {
                    data.shipments[index] = payload;
                    writeData(data);
                    res.status(200).json({ success: true });
                }
            } else if (action === 'deleteShipment') {
                data.shipments = data.shipments.filter(s => s.id !== payload.id);
                writeData(data);
                res.status(200).json({ success: true });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
