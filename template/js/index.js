var ic = 0;
function getData(){
  var d1 = [];
  for (var i = 0 ; i < 19 ; i += 0.1)
    d1.push([i, Math.sin(i - ic)]);

  if (ic==12.5) {ic=0;} else {ic = ic + 0.05;}
  ic = Math.round(ic*100)/100;
 
  return d1;
}

function update(){
  plot.setData([getData()]);
  plot.draw();
}

var plot = $.plot($("#myChart"), [ getData()]);
var int = self.setInterval(function(){update()},50);