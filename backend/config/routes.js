module.exports = function routes() {

	this.root('pages#main');
	this.resources('services', {
		only: ['index', 'show', 'create', 'update', 'destroy']
	});

}