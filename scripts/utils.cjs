const fs = require("node:fs/promises")

module.exports = {
	deleteDir: async (path) => {
  	try {
    	await fs.rm(path, { recursive: true, force: true });
    	console.log('Successfully removed files!');
  	} catch (err) {
    	console.log(err);
  	}
	},
}
