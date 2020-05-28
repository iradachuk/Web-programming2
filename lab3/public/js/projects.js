$(document).ready(function() {
    fillTable();
    $(`#createProjectButton`).on(`click`, createProject);
    $(`#projectsList tbody`).on('click', 'tr button.btn-danger', deleteProject);
    $(`#projectsList tbody`).on('click', 'tr', showProjectInfo);
    $(`#projectsList tbody`).on('click', 'tr button.btn-primary', updateProject);
});

function fillTable() {
    $(`#projectInfoId`).text('');
    $(`#projectInfoName`).text('');
    $(`#projectInfoDescription`).text('');
    $(`#projectInfoCustomer`).text('');
    $(`#projectInfoSkill`).text('');
    let tableContent = '';
    $.getJSON('/service/projects', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.description}</td>`;
            tableContent += `<td>${this.customer}</td>`;
            tableContent += `<td>${this.skill}</td>`;
            tableContent += `<td><button type="button" class="btn btn-primary">Update</button></td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`
            tableContent += `</tr>`;
        });
        $(`#projectsList tbody`).html(tableContent);
    });
}

function createProject(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let name = $(`#inputName`).val();
    let description = $(`#inputDescription`).val();
    let customer = $(`#inputCustomer`).val();
    let skill = $(`#inputSkill`).val();
    if (!id.trim().length|| !name.trim().length || !description.trim().length  || !customer.trim().length|| !skill.trim().length) {
        alert(`Please, fill in all of the fields`);
        return;
    }
    $.ajax({
        url: `/service/projects`,
        type: `POST`,
        data: {id: id, name: name, description: description, customer: customer, skill: skill},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showProjectInfo(event) {
    event.preventDefault();
    let projectId = $(this).attr("id");
    $.getJSON(`/service/projects/${projectId}`, function(data) {
        $(`#projectInfoId`).text(data.id);
        $(`#projectInfoName`).text(data.name);
        $(`#projectInfoDescription`).text(data.description);
        $(`#projectInfoCustomer`).text(data.customer);
        $(`#projectInfoSkill`).text(data.skill);
    });
}

function deleteProject(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let name = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Are you sure you want to delete project [${id}] ${name}?`)) {
        $.ajax({
            url: `/service/projects/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}

function updateProject(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();

    if (confirm(`Are you sure you want to update Project [${id}]?`)) {
        $.ajax({
            url: `/service/projects/${id}`,
            type: `PUT`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}