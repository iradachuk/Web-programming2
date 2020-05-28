$(document).ready(function() {
    fillTable();
    $(`#createProjectInProgressButton`).on(`click`, createProjectInProgress);
    $(`#projectInProgressList tbody`).on('click', 'tr button.btn-danger', deleteProjectInProgress);
    $(`#projectInProgressList tbody`).on('click', 'tr', showProjectInProgressInfo);
    $(`#projectInProgressList tbody`).on('click', 'tr button.btn-primary', updateProjectInProgress);
});

function fillTable() {
    $(`#projectInProgressInfoId`).text('');
    $(`#projectInProgressInfoProject`).text('');
    $(`#projectInProgressInfoPerformer`).text('');
    $(`#projectInProgressInfoBegin`).text('');
    $(`#projectInProgressInfoEnd`).text('');
    let tableContent = '';
    $.getJSON('/service/projectInProgress', function(data) {
        $.each(data, function() {
            tableContent += `<tr id="${this.id}">`;
            tableContent += `<td>${this.id}</td>`;
            tableContent += `<td>${this.Project}</td>`;
            tableContent += `<td>${this.Performer}</td>`;
            tableContent += `<td>${this.Begin}</td>`;
            tableContent += `<td>${this.End}</td>`;
            tableContent += `<td><button type="button" class="btn btn-primary">Update</button></td>`;
            tableContent += `<td><button type="button" class="btn btn-danger">Delete</button></td>`
            tableContent += `</tr>`;
        });
        $(`#projectInProgressList tbody`).html(tableContent);
    });
}

function createProjectInProgress(event) {
    event.preventDefault();
    let id = $(`#inputId`).val();
    let project = $(`#inputProject`).val();
    let performer = $(`#inputPerformer`).val();
    let begin = $(`#inputBegin`).val();
    let end = $(`#inputEnd`).val();
    if (!id.trim().length  || !project.trim().length || !performer.trim().length|| !begin.trim().length || !end.trim().length) {
        alert(`Please, fill in all of the fields`);
        return;
    }
    $.ajax({
        url: `/service/projectInProgress`,
        type: `POST`,
        data: {id: id, project: project, performer: performer, begin: begin, end: end},
        success: function(result) {
            alert(result);
            fillTable();
        }
    });
}

function showProjectInProgressInfo(event) {
    event.preventDefault();
    let projectInProgressId = $(this).attr("id");
    $.getJSON(`/service/projectInProgress/${projectInProgressId}`, function(data) {
        $(`#projectInProgressInfoId`).text(data.id);
        $(`#projectInProgressInfoProject`).text(data.project);
        $(`#projectInProgressInfoPerformer`).text(data.performer);
        $(`#projectInProgressInfoBegin`).text(data.begin);
        $(`#projectInProgressInfoEnd`).text(data.end);
    });
}

function deleteProjectInProgress(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();
    let performer = $(data).find(`td:nth-child(2)`).text();
    if (confirm(`Are you sure you want to delete project on [${id}] ${performer}?`)) {
        $.ajax({
            url: `/service/projectInProgress/${id}`,
            type: `DELETE`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}

function updateProjectInProgress(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    let data = $(this).parent().parent();
    let id = $(data).find(`td:nth-child(1)`).text();

    if (confirm(`Are you sure you want to update Performer [${id}]?`)) {
        $.ajax({
            url: `/service/projectInProgress/${id}`,
            type: `PUT`,
            success: function(result) {
                alert(result);
                fillTable();
            }
        });
    }
}
