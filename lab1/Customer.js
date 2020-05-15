CustomerCollection = []
let ProjectClass = require('./Project.js')

class Customer{
    constructor (name, company) {
        this.name = name
        this.company = company
        this.project = []
    }

    AddCustomer() {
        CustomerCollection.push(this)
    }

    EditCustomer (name, company) {
        this.name = name
        this.company = company
    }

    DeleteCustomer() {
        let curCustomIndex
        for(let i = 0; i < CustomerCollection.length; i++) {
            if(CustomerCollection[i].name === this.name) {
                curCustomIndex = i
            }
        }
        CustomerCollection.splice(curCustomIndex, 1)
    }

    AddProjectToCustomer (project) {
        let count = 0
        for(let i = 0; i < ProjectClass.ProjectCollection.length; i++) {
            if(ProjectClass.ProjectCollection[i].name === project.name && ProjectClass.ProjectCollection[i].area === project.area) {
                count++
            }
        }
        if(count === 0) {
            ProjectClass.ProjectCollection.push(project)
        }
        project.customer = this
        this.project.push(project)
    }

    static SearchCustomer(customerName) {
        let absent = 0
        for(let i = 0; i < CustomerCollection.length; i++) {
            if(CustomerCollection[i].name === customerName) {
                console.log(CustomerCollection[i])
                absent++
            }
        }
        if(absent === 0) {
            console.log("This customer is absent")
        }
    }

    SearchProjectOfCustomer() {
        if(this.project.length > 0){
            for(let i = 0; i < this.project.length; i++){
                console.log('Project №', i + 1, this.project[i])
            }
        } else {
            console.log('This customer has no projects')
        }
    }
 }

 module.exports = { Customer, CustomerCollection }