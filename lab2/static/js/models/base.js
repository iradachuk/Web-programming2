class BaseModel {
  constructor (collectionName) {
    this.collectionName = collectionName
    // Номер - унікальне значення.
    this.fields = ['id']
  }
  /**
   * @returns {Number}
   */
  getNextId (collection) {
    return collection.length + 1
  }


  /**
   * @returns {Object}
   */
  GetEmpty () {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }
  /**
   * @returns {Array}
   */
  Select () {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }
  Commit (collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }
  /**
   * @param {Number} id
   * @returns {BaseModel|undefined}
   */
  FindById (id) {
    return this.Select().find(item => item.id === id)
  }
  /**
   * @param {Number} id
   * @returns {Number}
   */
  FindIndexById (id) {
    return this.Select().findIndex(item => item.id === id)
  }
  Create (row) {
    const collection = this.Select()
    const entry = this.GetEmpty()

    console.log(row);
   if(this.collectionName === 'project_in_progress'){

      let all = JSON.parse(localStorage.getItem('customer'))
      console.log(all);
      let allCag = JSON.parse(localStorage.getItem('projects'))
      console.log(allCag);

      let starALL = allCag.filter((value, index) =>{
        return value.name == row.project
      })

      let star = all.filter((value, index) =>{
        return value.number == row['customer']
      })
      if(star.length===0 || starALL.length === 0) {
        alert("customer or project not found!")
      } else {

        for (const key in row) {
          if (key!=='id'&& row[key] ==='' ) {
            document.getElementById('error-text').innerHTML = "Empty object is invalid"
            return;
          }
        }
        document.getElementById('error-text').innerText = ""

        for (const key in row) {
          if (entry.hasOwnProperty(key) &&
              entry.key !== 'id') {
            entry[key] = row[key]
          }
        }

        entry.id = this.getNextId(collection)

        collection.push(entry)

        this.Commit(collection)

        const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
        document.dispatchEvent(event)
      }


    }
    else{
      for (const key in row) {
        if (key!=='id'&& row[key] ==='' ) {
          document.getElementById('error-text').innerHTML = "Empty object is invalid"
          return;
        }
      }
      document.getElementById('error-text').innerText = ""

      for (const key in row) {
        if (entry.hasOwnProperty(key) &&
            entry.key !== 'id') {
          entry[key] = row[key]
        }
      }
      entry.id = this.getNextId(collection)

      collection.push(entry)

      this.Commit(collection)

      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }


  }

  startEdit(ID) {
    let object = this.FindById(ID);

    Object.keys(object).forEach(function(item) {
      document.getElementById(item).value = object[item];
    })

    document.getElementById("form-button").innerHTML = "Save";
  }

  Edit(row) {
    for (const key in row) {

      if (key!=='id'&& row[key] ==='' ) {

        document.getElementById('error-text').innerHTML = "Empty object is invalid"
        return;
      }
    }
    document.getElementById('error-text').innerText = ""

    let collection_items = JSON.parse(localStorage.getItem(this.collectionName))

    for (let index = 0; index < collection_items.length; index++) {

      const element = collection_items[index];
      if (element.id === parseInt(document.getElementById('id').value)){

        for (const key in row) {
          if (element.hasOwnProperty(key)) {

            element[key] = row[key]
          }
        }
        element['id'] = parseInt(element['id']);
        break;
      }
    }
    this.Commit(collection_items)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection_items })

    document.dispatchEvent(event)
    document.getElementById('form-button').innerHTML = "Create"
  }

  DeleteById(ID){
    var collection_items = JSON.parse(localStorage.getItem(this.collectionName))

    for (let index = 0; index < collection_items.length; index++)
    {
      const element = collection_items[index];

      if (element.id ==  ID){
        collection_items.splice(index,1)
      }
    }

    localStorage.setItem(this.collectionName, JSON.stringify(collection_items));

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection_items })
    document.dispatchEvent(event)
  }
}

