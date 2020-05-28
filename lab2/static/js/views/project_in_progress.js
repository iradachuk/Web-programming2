'use strict'

const project_in_progressModel = new Project_in_progress()


function initAddForm () {
  const form = window.document.querySelector('#project_in_progress-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const project_in_progressData = {}
    formData.forEach((value, key) => {
      project_in_progressData[key] = value
    })
    if (document.getElementById("form-button").innerHTML === "Save") {
      project_in_progressModel.Edit(project_in_progressData)
    } else {
      project_in_progressModel.Create(project_in_progressData)
    }

    e.target.reset()
  })
}

function reportStationsNumber_of_workers(Collection, project_in_progressCollection) {

  for(let i = 0; i < Collection.length; i++)
  {
    
    let currentNumber_of_workers = 0;
    let currentCustomer = Collection[i];

    for(let j = 0; j < project_in_progressCollection.length; j++)
    {
      let currProject = project_in_progressCollection[j];

      if (currProject.station == currentCustomer.id)
      {
        currentNumber_of_workers += currProject.weight;
      }
    }

    if(currentNumber_of_workers / currentCustomer.capacity < 0.3)
    {
      console.log(currentCustomer);
    }
  }
}

function initList () {
  window.jQuery('#project_in_progress-list').DataTable({
    data: project_in_progressModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Project', data: 'project',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="project_in_progress/'+ row['id']  + '"  > '+row['project'] +' </a>'
          }
          return data
        }
      },
      { title: 'Performer',
        data: 'performer',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="project_in_progress/'+ row['id']  + '"  > '+row['performer'] +' </a>'
          }
          return data
        }
      },
      { title: 'Begin',
        data: 'begin',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="project_in_progress/'+ row['id']  + '"  > '+row['begin'] +' </a>'
          }
          return data
        }
      },
      { title: 'End',
        data: 'end',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="project_in_progress/'+ row['id']  + '"  > '+row['end'] +' </a>'
          }
          return data
        }
      },
      { title: 'Edit', data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="project_in_progressModel.startEdit(' + data + ')"> Edit </button>'
          }
          return data
        }
      },
      {
        title: 'Delete',
        data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="project_in_progressModel.DeleteById(' + row['id'] + ')"> Delete </button>'
          }
          return data
        }
      },
    ]
  })
}

function initListEvents () {
  document.addEventListener('project_in_progresssListDataChanged', function (e) {
    const dataTable = window.jQuery('#project_in_progress-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
  reportStationsNumber_of_workers()
})