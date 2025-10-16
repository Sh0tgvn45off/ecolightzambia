// Mobile Money Modal Functions
function openMobileMoneyModal() {
    document.getElementById('mobileMoneyModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMobileMoneyModal() {
    document.getElementById('mobileMoneyModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// PayPal Modal Functions
function openPayPalModal() {
    document.getElementById('paypalModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePayPalModal() {
    document.getElementById('paypalModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Mobile Money Payment Initiations
function initiateMpesaPayment() {
    const phoneNumber = '+260973032559';
    // M-PESA deep link (format may vary by country)
    const mpesaUrl = `mpesa://sendmoney?phone=${encodeURIComponent(phoneNumber)}`;
    
    // Try to open the app, fallback to instructions
    window.location.href = mpesaUrl;
    
    setTimeout(() => {
        alert(`Please send your donation to:\n\n${phoneNumber}\n\nvia M-PESA\n\nThank you for your support!`);
    }, 1000);
}

function initiateAirtelPayment() {
    const phoneNumber = '+260973032559';
    // Airtel Money deep link
    const airtelUrl = `airtelmoney://pay?phone=${encodeURIComponent(phoneNumber)}`;
    
    window.location.href = airtelUrl;
    
    setTimeout(() => {
        alert(`Please send your donation to:\n\n${phoneNumber}\n\nvia Airtel Money\n\nThank you for your support!`);
    }, 1000);
}

function initiatePawaPayPayment() {
    const phoneNumber = '+260973032559';
    // PawaPay typically requires integration with their API
    // For now, show instructions
    alert(`Please send your donation to:\n\n${phoneNumber}\n\nvia PawaPay\n\nThank you for your support!`);
}

// PayPal Payment Functions
function proceedWithPayPal() {
    const paypalEmail = 'ecolight.zm@gmail.com';
    // PayPal.me link (you should create this in your PayPal account)
    const paypalUrl = `https://www.paypal.com/paypalme/ecolightzm`;
    
    // Alternatively, use standard PayPal link
    // const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}&currency_code=USD&amount=&item_name=Donation to EcoLight Innovations`;
    
    window.open(paypalUrl, '_blank');
}

function proceedWithCard() {
    // This should redirect to your PayPal donation page
    const paypalEmail = 'ecolight.zm@gmail.com';
    const paypalUrl = `https://www.paypal.com/donate/?hosted_button_id=YOUR_BUTTON_ID`;
    
    // Or use a standard payment link
    window.open(paypalUrl, '_blank');
}

// Close modals when clicking outside
window.onclick = function(event) {
    const mobileModal = document.getElementById('mobileMoneyModal');
    const paypalModal = document.getElementById('paypalModal');
    
    if (event.target == mobileModal) {
        closeMobileMoneyModal();
    }
    if (event.target == paypalModal) {
        closePayPalModal();
    }
}