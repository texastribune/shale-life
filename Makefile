process_spreadsheet:
	node ./tools/download_xlsx.js
	node ./tools/build_data_json.js

test-deploy:
	aws s3 sync --delete --acl public-read dist s3://newsapps.test.texastribune.org/

# deploy:
# 	aws s3 sync --delete --acl public-read s3://apps.texastribune.org/shale-life/
