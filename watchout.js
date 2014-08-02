// make enemies
var enemyArray = [];
for( var i = 0; i < 30; i++ ){
  var rand = Math.random() * 720;
  enemyArray[i] = rand;
}

d3.select('.enemyGroup').selectAll('.enemies').data(enemyArray).enter()
.append('circle').classed('enemies', true)
.attr('cx', function(data){
return data;}).attr('cy', function(data){return Math.random() * 400})
.attr('r', 6).attr('fill', 'teal');

var moveEnemy = function(){
  d3.selectAll('.enemies').data(enemyArray).transition().duration(1500)
  .attr('cx', function(data){return Math.random() * 720;})
  .attr('cy', function(data){return Math.random() * 400;})
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

/*
checkCollision = (enemy, collidedCallback) ->
    _(players).each (player) ->
      radiusSum =  parseFloat(enemy.attr('r')) + player.r
      xDiff = parseFloat(enemy.attr('cx')) - player.x
      yDiff = parseFloat(enemy.attr('cy')) - player.y

      separation = Math.sqrt( Math.pow(xDiff,2) + Math.pow(yDiff,2) )
      collidedCallback(player, enemy) if separation < radiusSum

 */
function checkCollision(){
  var player = d3.select('.player').select('circle');
  var enemyAttacker = d3.select('.enemyGroup').selectAll('.enemies');
  var radiusSum = player.attr('r') + enemyAttacker.attr('r');
  var xDiff = enemyAttacker.attr('cx') - player.attr('cx');
  var yDiff = enemyAttacker.attr('cy') - player.attr('cy');
  var seperation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  if( seperation < radiusSum ){
    console.log('hit');
  }
};

d3.selectAll('.enemies').each(function(){checkCollision()});

setInterval(function(){checkCollision();}, 100);
