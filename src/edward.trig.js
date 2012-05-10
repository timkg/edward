var edward = edward || {};

edward.trig = (function(){
    
    var deg2rad = edward.utils.deg2rad,
        rad2deg = edward.utils.rad2deg;
    
    
    function sin( angleInDegrees ) {
        return Math.sin( deg2rad( angleInDegrees ) );
    }
    
    
    function cos( angleInDegrees ) {
        return Math.cos( deg2rad( angleInDegrees ) );
    }
    
    
    function tan( angleInDegrees ) {
        return Math.tan( deg2rad( angleInDegrees ) );
    }
    
    
    function asin( ratio ) {
        return rad2deg( Math.asin( ratio ) );
    }
    
    
    function acos( ratio ) {
        return rad2deg( Math.acos( ratio ) );
    }
    
    return {
        sin: sin,
        cos: cos,
        tan: tan,
        asin: asin,
        acos: acos
    };
    
}());