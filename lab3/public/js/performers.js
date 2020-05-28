$(document).ready(function() {
    fillTable();
    $(`#createPerformerButton`).on(`click`, createPerformer);
    $(`#performersList tbody`).on('click', 'tr button.btn-danger', deletePerformer);
    $(`#performersList tbody`).on('click', 'tr', showPerformerInfo);
    $(`#performersList tbody`).on('click', 'tr button.btn-primary', updatePerformer);
});

function fillTable() {
    $(`#performerInfoId`).text('');
    $(`#performerInfoName`).text('');
    $(`#performerInfoExperience`).text('');
    $(`#performerInfoNumOfWorkers`).text('');
    let tableContent = '';
    $.getJSON('/service/performers', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.name}</td>`;
            tableContent += `<td>${this.experience}</td>`;
            tableContent += `<td>${this.workers}</td>`;
            tableContent += `<td><button type="button" class="btn btn-primary">Update</button></td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`
            tableContent += `</tr>`;
        });
        $(`#performersList tbody`).html(tableContent);
    });
}

function createPerformer(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let name = $(`#inputName`).val();
    let experience = $(`#inputExperience`).val();
    let workers = $(`#inputWorkers`).val();
    if (!id.trim().length || !name.trim().length || !experience.trim().length || !workers.trim().length) {
        alert(`Please, fill in all of the fields`);
        return;
    }
    $.ajax({
        url: `/service/performers`,
        type: `POST`,
        data: {id: id, name: name, experience: experience, workers: workers},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showPerformerInfo(event) {
    event.preventDefault();
    let performerId = $(this).attr("id");
    $.getJSON(`/service/performers/${performerId}`, function(data) {
        $(`#performerInfoId`).text(data.id);
        $(`#performerInfoName`).text(data.name);
        $(`#performerInfoExperience`).text(data.experience);
        $(`#performerInfoWorkers`).text(data.workers);
    });
}

function deletePerformer(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let name = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Are you sure you want to delete performer [${id}] ${name}?`)) {
        $.ajax({
            url: `/service/performers/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}

function updatePerformer(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();

    if (confirm(`Are you sure you want to update Performer [${id}]?`)) {
        $.ajax({
            url: `/service/performers/${id}`,
            type: `PUT`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}
