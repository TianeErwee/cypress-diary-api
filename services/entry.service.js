const EntryModel = require("../models/entry.model");

class EntryService
{
	static create(data)
	{
		let entry = new EntryModel(data.id, data.title, data.content, new Date());

		return entry;
	}

	// static retrieve(uid)
	// {
	// 	if(customers[uid] != null)
	// 	{
	// 		return customers[uid];
	// 	}
	// 	else
	// 	{
	// 		throw new Error('Unable to retrieve a customer by (uid:'+ uid +')');
	// 	}
	// }

	// static update(uid, data)
	// {
	// 	if(customers[uid] != null)
	// 	{
	// 		const customer = customers[uid];
			
	// 		Object.assign(customer, data);
	// 	}
	// 	else
	// 	{
	// 		throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
	// 	}
	// }

	// static delete(uid)
	// {
	// 	if(customers[uid] != null)
	// 	{
	// 		delete customers[uid];
	// 	}
	// 	else
	// 	{
	// 		throw new Error('Unable to retrieve a customer by (uid:'+ cuid +')');
	// 	}
	// }
}

module.exports = EntryService;