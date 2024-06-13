document.addEventListener('DOMContentLoaded', () => {
    const hourlyPrice = 22;
    const dailyPrice = 59;
    const monthlyPrice = 689;

    document.getElementById('hourly-price').textContent = `R$ ${hourlyPrice},00`;
    document.getElementById('daily-price').textContent = `R$ ${dailyPrice},00`;
    document.getElementById('monthly-price').textContent = `R$ ${monthlyPrice},00`;
});
