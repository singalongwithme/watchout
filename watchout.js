// make enemies
var numberOfCollisions = 0; var hasCollided = 0; var currentScore = 0;
var highScore = 0;
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
  .ease('circle');
};

setInterval(function(){moveEnemy()}, 1500);

var drag = d3.behavior.drag()
    .on("drag", dragmove);
function dragmove() {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("cx", x).attr('cy', y);
};

d3.select('.player').call(drag);

var collision = function(){

d3.selectAll('.enemies').each(function(){
  //debugger;

  var player = d3.select('.player');
  var enemyAttacker = d3.select('.enemyGroup').select('.enemies');
  var radiusSum = parseInt(player.attr('r')) + parseInt(enemyAttacker.attr('r'));
  var xDiff = d3.select(this).attr('cx') - player.attr('cx');
  var yDiff = d3.select(this).attr('cy') - player.attr('cy');
  var seperation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

  if( seperation < radiusSum ){
    if( currentScore >= highScore ){
      highScore = currentScore;
      d3.select('.high').text('High score: ' + highScore);
    }
    hasCollided++;
    d3.select('.collisions').text('Collision: ' + hasCollided);
    currentScore = 0;
  }
});
};

var score = function(){
  currentScore++;
  d3.select('.current').text('Current score: ' + currentScore);
}

setInterval(function(){score();}, 50);

setInterval(function(){collision();}, 50);
