module.exports = function(price, markerBg) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext('2d');
  canvas.width = markerBg.width;
  canvas.height = markerBg.height;
  ctx.drawImage(markerBg, 0, 0);
  ctx.font = "13pt Arial";
  ctx.fillStyle = 'white';
  var text = "$" + price;
  var textWidth = ctx.measureText(text).width;
  var x = Math.floor((canvas.width / 2) - (textWidth / 2));
  ctx.fillText(text, x, 26);
  return canvas.toDataURL("image/png");
};
