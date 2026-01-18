const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        if (req.method === 'GET') {
            // Получаем все данные
            const [productsData, salesData, deliveriesData, shipmentsData] = await Promise.all([
                supabase.from('products').select('*'),
                supabase.from('sales').select('*'),
                supabase.from('deliveries').select('*'),
                supabase.from('shipments').select('*')
            ]);

            res.status(200).json({
                products: productsData.data || [],
                sales: salesData.data || [],
                deliveries: deliveriesData.data || [],
                shipments: shipmentsData.data || []
            });
        } else if (req.method === 'POST') {
            const { action, payload } = req.body;

            if (action === 'addProduct') {
                const { data, error } = await supabase.from('products').insert([payload]);
                if (error) throw error;
                res.status(200).json({ success: true, product: data[0] });
            } else if (action === 'updateProduct') {
                const { data, error } = await supabase.from('products').update(payload).eq('id', payload.id);
                if (error) throw error;
                res.status(200).json({ success: true });
            } else if (action === 'deleteProduct') {
                const { error } = await supabase.from('products').delete().eq('id', payload.id);
                if (error) throw error;
                res.status(200).json({ success: true });
            } else if (action === 'addSale') {
                const { data, error } = await supabase.from('sales').insert([payload]);
                if (error) throw error;
                res.status(200).json({ success: true, sale: data[0] });
            } else if (action === 'updateSale') {
                const { data, error } = await supabase.from('sales').update(payload).eq('id', payload.id);
                if (error) throw error;
                res.status(200).json({ success: true });
            } else if (action === 'addDelivery') {
                const { data, error } = await supabase.from('deliveries').insert([payload]);
                if (error) throw error;
                res.status(200).json({ success: true, delivery: data[0] });
            } else if (action === 'updateDelivery') {
                const { data, error } = await supabase.from('deliveries').update(payload).eq('id', payload.id);
                if (error) throw error;
                res.status(200).json({ success: true });
            } else if (action === 'addShipment') {
                const { data, error } = await supabase.from('shipments').insert([payload]);
                if (error) throw error;
                res.status(200).json({ success: true, shipment: data[0] });
            } else if (action === 'updateShipment') {
                const { data, error } = await supabase.from('shipments').update(payload).eq('id', payload.id);
                if (error) throw error;
                res.status(200).json({ success: true });
            } else if (action === 'deleteShipment') {
                const { error } = await supabase.from('shipments').delete().eq('id', payload.id);
                if (error) throw error;
                res.status(200).json({ success: true });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
