import http, { request } from 'k6/http'
import { check } from 'k6'
import { Counter } from 'k6/metrics'
import { Gauge } from 'k6/metrics'
import { Rate } from 'k6/metrics'
import { Trend } from 'k6/metrics'

export const options = {
    vus: 1,
    duration: '3s'
}

const chamadas = new Counter('quantidade_de_chamadas')
const myGauge = new Gauge('tempo_bloqueado')
const myRate = new Rate('taxa_de_requisicao_200')
const myTrend = new Trend('taxa_de_espera')

export default function() {
    const res = http.get('http://test.k6.io')
    check(res, {
        'status code é 200': (res) => res.status === 200
    })
    //contador
    chamadas.add(1)
    //medidor
    myGauge.add(res.timings.blocked)
    //taxa
    myRate.add(res.status == 200)
    //tendencia
    myTrend.add(res.timings.waiting)
}