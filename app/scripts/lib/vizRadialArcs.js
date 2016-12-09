/*******************************************************************************
* arcs coming out from a circle
*/
function VizRadialArcs(variant) {
  this.dampen = true;
  this.hasVariants = true;
  this.variants = [[false, true], [true, false], [false, false]];

  this.vary(variant);
}

VizRadialArcs.prototype.vary = function(variant) {
  this.variant = variant;
  this.gap = this.variants[variant][0];
  this.fade = this.variants[variant][1];
}

VizRadialArcs.prototype.resize = function() {}

VizRadialArcs.prototype.draw = function(spectrum) {
  ctx.clearRect(0, 0, cv.width, cv.height)
  ctx.translate(cv.width / 2, cv.height / 2);
  ctx.rotate(allRotate);
  for (var i = 0; i < bandCount; i++) {
    ctx.rotate(rotateAmount);
    var hue = 2;
    var brightness = 99;
    if (this.fade) {
      var brightness = constrain(Math.floor(spectrum[i] / 1.5), 25, 50); 
    }
    ctx.fillStyle = bigColorMap[hue * 20 + brightness];
    ctx.beginPath();
    if (this.gap) {
      ctx.arc(0, 0, centerRadius + Math.max(spectrum[i] * heightMultiplier/10, 2),
        0, rotateAmount / 2);
    } else {
      ctx.arc(0, 0, centerRadius + Math.max(spectrum[i] * heightMultiplier/10, 2),
        0, rotateAmount + 0.05);
    }
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.closePath();
  }
  // ctx.fillStyle = 'rgba(0,0,0,.5)';
  ctx.beginPath();
  ctx.arc(0, 0, centerRadius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
  allRotate += 0.2;
}