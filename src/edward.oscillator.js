var edward = edward || {};

/***
 * 
 */
edward.Oscillator = (function(){
    
    function Oscillator( _opts ) {
        
        var opts = _opts || {},
        _params = {
            'target': true,
            'start': true,
            'function': true,
            'increment': true,
            'range': true
        };

        for( var p in _params ) {
            if( !( p in opts ) ) {
                edward.error( 'Oscillator requires argument ' + p );
                return false;
            }
        }


        edward.extend( this, opts );

        this.id = edward.utils.guidGenerator();

        // set @target to @start-value
        this[opts['target']] = opts.start;

        // set @angle to @increment
        this.angle = opts.increment;

        // called at every TICK event
        this.pulse = function Oscillator_Pulse( ) {

            // set target to start value + ( range * func(angle) )
            this[opts['target']] = opts.start + ( opts.range * opts['function'].call( this, this.angle ) );
            
            this.angle += opts.increment;
            if( this.angle > 360 ) {
                this.angle = this.angle % 360;
            }
            
            edward.event.publish( this.id, this[opts['target']] );
            
//            edward.log( this.id + ' updated to ' + this[opts['target']] );
        };
        
        edward.event.subscribe( 'tick', this.pulse.bind( this ) );
        
    }
    
    
    return Oscillator;
    
}());