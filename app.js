const {Client} = require( '@elastic/elasticsearch' );
const fromClient = new Client( {node: 'http://localhost:20200'} );
const toClient = new Client( {node: 'http://localhost:9200'} );

async function run() {
	const result = await fromClient.search( {
		index: 'organisations',
		body: {
			"size": 100,
			"query": {
				"match_all": {}
			}
		}
	} );

	result.body['hits']['hits'].map( doc => update( doc['_source'] ) );
}

async function update( source ) {
	console.log( source );
	await toClient.index( {
		index: 'organisations',
		body: source
	} );
}

run().catch( console.log );