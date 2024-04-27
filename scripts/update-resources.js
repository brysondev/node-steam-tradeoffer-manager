const FS = require('fs');
const Axios = require('axios');

const filesToDownload = {
	"resources/EResult.js": "https://raw.githubusercontent.com/DoctorMcKay/node-steam-user/master/enums/EResult.js"
};

for (let destinationPath in filesToDownload) {
	console.log("Downloading " + filesToDownload[destinationPath] + " -> " + __dirname.replace(/\\/g, '/') + "/../" + destinationPath);
	Axios.get({
		"uri": filesToDownload[destinationPath],
		"gzip": true
	}, (err, res, body) => {
		if (err) {
			throw err;
		}

		if (res.statusCode != 200) {
			throw new Error("HTTP error " + res.statusCode);
		}

		FS.writeFileSync(__dirname + "/../" + destinationPath, body);
	});
}
