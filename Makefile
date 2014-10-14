process_spreadsheet:
	node ./tools/download_xlsx.js
	node ./tools/build_data_json.js
