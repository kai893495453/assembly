
/**
 * [GetSize 获取传入对象的宽高]
 * @param {[Object]} obj [传入对象]
 */
function GetSize(obj){
	var json = {
		offsetWidth : obj.offsetWidth,
		offsetHeight: obj.offsetHeight,
		clientWidth : obj.clientWidth,
		clientHeight: obj.clientHeight,
		scrollHeight: obj.scrollHeight,
		scrollWidth : obj.scrollWidth
	}
	return json;
}