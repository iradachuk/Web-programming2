$(document).ready(function() {
    fillTable();
    $(`#createCustomerButton`).on(`click`, createCustomer);
    $(`#customersList tbody`).on('click', 'tr button.btn-danger', deleteCustomer);
    $(`#customersList tbody`).on('click', 'tr', showCustomerInfo);
    $(`#customersList tbody`).on('click', 'tr button.btn-primary', updateCustomer);
});

function fillTable() {
    $(`#CustomerInfoId`).text('');
    $(`#CustomerInfoName`).text('');
    $(`#CustomerInfoBudget`).text('');
    let tableContent = '';
    $.getJSON('/service/customers', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.budget}</td>`;
            tableContent += `<td><button type="button" class="btn btn-primary">Update</button></td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`;
            tableContent += `</tr>`;
        });
        $(`#customersList tbody`).html(tableContent);
    });
}

function createCustomer(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let name = $(`#inputName`).val();
    let budget = $(`#inputBudget`).val();
    if (!id.trim().length || !name.trim().length || !budget.trim().length) {
        alert(`Please, fill in all of the fields`);
        return;
    }
    $.ajax({
        url: `/service/customers`,
        type: `POST`,
        data: {id: id, name: name, budget: budget},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showCustomerInfo(event) {
    event.preventDefault();
    let customerId = $(this).attr("id");
    $.getJSON(`/service/customers/${customerId}`, function(data) {
        $(`#customerInfoId`).text(data.id);
        $(`#customerInfoName`).text(data.name);
        $(`#customerInfoBudget`).text(data.budget);
    });
}

function deleteCustomer(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let name = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Are you sure you want to delete Customer [${id}] ${name}?`)) {
        $.ajax({
            url: `/service/customers/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}

function updateCustomer(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();

    if (confirm(`Are you sure you want to update Customer [${id}]?`)) {
        $.ajax({
            url: `/service/customers`,
            type: `PUT`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}