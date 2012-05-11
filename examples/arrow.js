function Arrow ( canvas ) {
    
    this.x = 0;
    this.y = 0;
    this.color = "#ffff00";
    this.rotation = 0;
    this.ctx = canvas.getContext( '2d' );
}

Arrow.prototype = {};


Arrow.prototype.draw = function( ) {
    
    var context = this.ctx;
    
    context.save();
    context.translate( this.x, this.y) ;
    context.rotate( edward.utils.deg2rad( this.rotation ) );
    context.lineWidth = 2;
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo( -50, -25 );
    context.lineTo( 0, -25 );
    context.lineTo( 0, -50 );
    context.lineTo( 50, 0 );
    context.lineTo( 0, 50 );
    context.lineTo( 0, 25 );
    context.lineTo( -50, 25 );
    context.lineTo( -50, -25 );
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
};


edward.extend( Arrow.prototype, {
    getRotationTo: edward.rotation.getRotationTo
});