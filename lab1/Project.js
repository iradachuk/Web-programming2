let ProjectCollection = []
//let PerformerClass = require('./Performer.js')
//let CustomerClass = require('./Customer.js')

class Project{
    constructor (name, area) {
        this.name = name
        this.area = area
        this.customer = undefined
        this.performer = undefined
    }

    AddProject() {
        ProjectCollection.push(this)
    }

    EditProject(name, area) {
        this.name = name
        this.area = area
    }

    DeleteProject() {
        for(let i = 0; i < ProjectCollection.length; i++) {
            if(ProjectCollection[i].name === this.name) {
                ProjectCollection.splice(i, 1)
            }
        }
    }
}

module.exports = { Project, ProjectCollection }