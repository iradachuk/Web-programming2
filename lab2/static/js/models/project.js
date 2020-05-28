class Project extends BaseModel {
  constructor () {
    super('project')
  
    this.fields = this.fields.concat(['name', 'description', 'customer'])
  }
}
