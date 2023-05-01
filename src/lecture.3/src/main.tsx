import xstream from 'xstream'

function getSinks() {
    return {
        DOM : xstream.periodic(1000)
                .fold(prev => prev * 2 , 1)
                .map(val => `current value is ${val}`),
        log : xstream.periodic(2000)
                .fold(prev => prev * 2 , 1)
                .map(console.log),
    }
}

function getDrivers() {
    return {
        DOM : (sink) => sink.subscribe({
                            next: str => {
                                const elem = document.querySelector('#app');
                                elem!.textContent =  str as string;
                            }
                        }),
        log : (sink) => sink.subscribe({
                            next: msg => {
                                console.log(msg);
                            },
                        })
    }
}

const sinks = getSinks();
const drivers = getDrivers() 

Object.keys(sinks).map((key,index)=> {
    drivers[key](sinks[key])
})