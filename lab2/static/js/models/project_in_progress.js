class Project_in_progress extends BaseModel {
  constructor () {
    super('project_in_progress')
  
    this.fields = this.fields.concat(['project', 'performer', 'begin', 'end'])
  }
}
