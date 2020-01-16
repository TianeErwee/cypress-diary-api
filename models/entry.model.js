class EntryModel
{
	constructor(id, title, content, date_created)
	{
    this.id = id;
    this.title = title;
    this.content = content;
    this.date_created = date_created;
	}
}

module.exports = EntryModel;