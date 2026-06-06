


let loggedInUser = JSON.parse(localStorage.getItem('invoiceLoggedInUser'));

if (!loggedInUser) {



 
    window.location.href = 'login.html';
}





if (loggedInUser) {
    document.getElementById('companyNameDisplay').innerText = loggedInUser.businessName;
    document.getElementById('companyAddressDisplay').innerText = loggedInUser.businessAddress;
    document.getElementById('welcomeName').innerText = loggedInUser.businessName;
}


document.getElementById('date').innerText = new Date().toLocaleDateString();



let subTotal = 0; 


function updateCustomer() {
    let name = document.getElementById('customerNameInput').value;
    let address = document.getElementById('customerAddressInput').value;


    let phone = document.getElementById('customerPhoneInput').value;

    document.getElementById('customerNameDisplay').innerText = name || 'Customer Name';
    document.getElementById('customerAddressDisplay').innerText = address || 'Customer Address';


    document.getElementById('customerPhoneDisplay').innerText = phone || 'Phone Number';
}


function addItem() {

    let name = document.getElementById('itemName').value;
    let price = document.getElementById('itemPrice').value;




    let qty = document.getElementById('itemQty').value;

    if (name === '' || price === '' || qty === '') {
        alert('Please fill all fields before adding!');


        return;
    }


    let itemTotal = price * qty;



    subTotal = subTotal + itemTotal;




    let tableBody = document.getElementById('itemList');
    let newRow = `<tr>
                    <td>${name}</td>
                    <td>RS. ${price}</td>
                    <td>${qty}</td>
                    <td>RS. ${itemTotal}</td>
                  </tr>`;

    tableBody.innerHTML += newRow; 




    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';


    document.getElementById('itemQty').value = '1';

    updateGrandTotal(); 

}



function updateGrandTotal() {
    document.getElementById('subTotal').innerText = subTotal;
    
    let taxPercent = parseFloat(document.getElementById('taxInput').value) || 0;
    let discount = parseFloat(document.getElementById('discountInput').value) || 0;

    let taxAmount = (subTotal * taxPercent) / 100;
    document.getElementById('taxDisplay').innerText = taxAmount.toFixed(2);


    document.getElementById('discountDisplay').innerText = discount.toFixed(2);

    let finalTotal = subTotal + taxAmount - discount;
    document.getElementById('grandTotal').innerText = finalTotal.toFixed(2);
}


function updateStatus() {
    let status = document.getElementById('statusSelect').value;


    let badge = document.getElementById('statusBadge');
    badge.innerText = status;

    if (status === 'Paid') {
        badge.style.background = '#55efc4';
        badge.style.color = '#00b894';
    } else if (status === 'Unpaid') {
        badge.style.background = '#fab1a0';


        badge.style.color = '#d63031';
    } else {
        badge.style.background = '#ffeaa7';


        badge.style.color = '#e17055';
    }
}




function resetInvoice() {
    subTotal = 0;
    document.getElementById('subTotal').innerText = '0';
    document.getElementById('taxDisplay').innerText = '0';
    document.getElementById('discountDisplay').innerText = '0';

    document.getElementById('grandTotal').innerText = '0';



    document.getElementById('itemList').innerHTML = '';
    document.getElementById('customerNameInput').value = '';
    document.getElementById('customerAddressInput').value = '';
    document.getElementById('customerPhoneInput').value = '';



    document.getElementById('customerNameDisplay').innerText = 'Customer Name';
    document.getElementById('customerAddressDisplay').innerText = 'Customer Address';
    document.getElementById('customerPhoneDisplay').innerText = 'Phone Number';
}


function handleLogout() {


    localStorage.removeItem('invoiceLoggedInUser');
    window.location.href = 'login.html';


    
}
