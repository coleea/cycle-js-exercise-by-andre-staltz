import xs from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'

function main(sources) {
    const click$ = sources.DOM;
    return {
        DOM: click$.startWith(null).map(() => 
            xs.periodic(1000)                       
             .fold(prev => prev + 1, 0)
          ).flatten()
           .map(i => `Seconds elapsed: ${i}`),
        log: xs.periodic(2000)                       
           .fold(prev => prev + 1, 0)
    } 
}

// source = input (read) effect
// sink = output (write) effect

function domDriver(text$) {
    console.log('fakedomsink');    
    console.log({text$});
    // 아무런 내용도 없는 빈깡통 sink
    
   text$.subscribe({
    next: str => {
        const elem = document.querySelector('#app');
        elem!.textContent = str;
     }})  
     const domSource = fromEvent(document, 'click');
     return domSource;
}

function logDriver(msg$) {
    msg$.subscribe({ next: msg => { console.log(msg); }})
}

function run(mainFn, drivers) {
    const fakeDOMSink = xs.create();
    const domSource = domDriver(fakeDOMSink);
    const sinks = mainFn({DOM: domSource});
    console.log({sinks});
    
    fakeDOMSink.imitate(sinks.DOM)
    
    
   /* Object.keys(drivers).forEach(key => {
        if (sinks[key]) {
            drivers[key](sinks[key]);
        }
    });*/
}

run(main, {
    DOM: domDriver,
    log: logDriver,    
});



