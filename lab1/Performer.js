let PerformerCollection = []
let ProjectClass = require('./Project.js')

class Performer {
    constructor (name, experience) {
        this.name = name
        this.experience = experience
        this.project = []
    }

    AddPerformer() {
        PerformerCollection.push(this)
    }

    EditPerformer (name, company) {
        this.name = name
        this.company = company
    }

    DeletePerformer() {
        for(let i = 0; i < PerformerCollection.length; i++){
            if(PerformerCollection[i].name === this.name && PerformerCollection[i].experience === this.experience){
                PerformerCollection.splice(i, 1)
            }
        }
    }

    AddProjectToPerformer (project) {
        let count = 0
        for(let i = 0; i < ProjectClass.ProjectCollection.length; i++){
            if(ProjectClass.ProjectCollection[i].name === project.name && ProjectClass.ProjectCollection[i].area === project.area){
                count += 1
            }
        }
        if(count === 0) {
            ProjectClass.ProjectCollection.push(project)
        }
        project.performer = this
        this.project.push(project)
    }

    SearchProjectOfPerformer() {
        if(this.project.length > 0) {
            for(let i = 0; i < this.project.length; i++) {
                console.log('Project №', i + 1, this.project[i])
            }
        } else {
            console.log('This performer has no projects')
        }
    }
}

module.exports = {Performer, PerformerCollection }