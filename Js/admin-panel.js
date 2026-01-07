// Payment tracking database structure
const paymentDB = {
    orders: [
        {
            orderId: 'APPGU-B45281',
            package: 'basic',
            amount: 5250,
            customer: { name: 'John Doe', email: 'john@example.com' },
            status: 'pending', // pending, paid, confirmed, activated
            paymentDate: null,
            transactionRef: null,
            whatsappConfirm: false,
            activatedAt: null
        }
    ]
};
