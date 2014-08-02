// make enemies
var enemyArray = [];
for( var i = 0; i < 30; i++ ){
  var rand = Math.random() * 720;
  enemyArray[i] = rand;
}

d3.select('.enemyGroup').selectAll('.enemies').data([1]).enter()
.append('circle').classed('enemies', true).attr('cx', function(data){
return data;}).attr('cy', function(data){return Math.random() * 400})
.attr('r', 6).attr('fill', 'teal');
