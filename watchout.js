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

var moveEnemy = function(){
  d3.selectAll('.enemies').data(enemyArray).transition().duration(1500)
  .attr('cx', function(data){return Math.random() * 720;})
  .attr('cy', function(data){return Math.random() * 400;});
};

setInterval(function(){moveEnemy()}, 2000);

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove() {
  var x = d3.event.x - 100;
  var y = d3.event.y - 100;
  //d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
  d3.select(this).attr("transform", 'translate(' + x + ',' + y + ')');
};

d3.select('.player').call(drag);
