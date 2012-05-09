var edward = edward || {};

/**
 * Edward event/pubsub module
 * Heavily based on 
 *     http://www.addyosmani.com/resources/essentialjsdesignpatterns/book
 *     
 * TODO: unsubscribe without depending on specific subscribe tokens
 * 
 */
edward.event = (function(){
    
    var topics = {},
        subUid = 0;
    
    
    function publish( topic, args ) {
        
        if( !topics[topic] ) {
            return false;
        }
        
        var subscribers = topics[topic],
            len = subscribers ? subscribers.length : 0;
        
        
        while( len-- ) {
            subscribers[len].func( topic, args );
        }
        
        return this;
        
    }
    
    
    
    function subscribe( topic, func ) {
        
        if( !topics[topic] ) {
            topics[topic] = [];
        }
        
        var token = ( subUid++ ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        
        return token;
        
    }
    
    
    function unsubscribe( token ) {
        
        for( var m in topics ) {
            if( topics[m] ) {
                for( var i = 0, j = topics[m].length; i < j; i++ ) {
                    if( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    }
    
    
    return {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };
    
}());