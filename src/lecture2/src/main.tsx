import xstream from 'xstream'
import fromEvent from 'xstream/extra/fromEvent'

const sink = xstream.periodic(1000)
        .fold(prev => prev * 2 , 1)
        .map(val => `[second elapsed] ${val}`)

sink.subscribe({
    next : str => document.querySelector("#app")!.textContent = str
})

sink.subscribe({
    next : console.log
})