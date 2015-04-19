// Returns a cat gif from the API and passes URL to the callback
// TODO: Boss wants everything namespaced
function getCatGif(callback) {
	ajax("/api/gifs", { type: CAT }, function(data) {
		callback(data.url);
	});
}
