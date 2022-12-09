export default function formatPrice(value){
    if (!value){
        return null;
    }

    let orderPrice = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
    });

    return orderPrice.format(value);
}