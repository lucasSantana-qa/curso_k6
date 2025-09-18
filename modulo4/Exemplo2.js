// //Public api: buscar todos os crocodilos
// Critérios: 
//     performance test: ramp up 10 vus em 10s, carga 10 vus por 10s, ramp down 0 vu em 10s
//     limite: requisições com sucesso > 95%;
//     tempo requisicao p(95) < 200 

import { check, sleep } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data'

export const options = {
    stages: [
        {duration: '10s', target: 10},
        {duration: '10s', target: 10},
        {duration: '10s', target: 0}
    ],
    thresholds: {
        checks: ['rate > 0.95'],        
        http_req_duration: ['p(95) < 200']
    }
 }

export const data = new SharedArray('Leitura dados', function() {
    return JSON.parse(open('dados.json')).crocodilos
})

export default function() {
    const CROC_ID = data[Math.floor(Math.random() * data.length)].id

    const BASE_URL = 'https://test-api.k6.io'
    const res = http.get(`${BASE_URL}/public/crocodiles/${CROC_ID}/`)

    check(res, {
        'status code 200': (res) => res.status === 200
    })

    sleep(1)
}