// //Public api: realizar login com um novo usuário
// Critérios: 
//     stress test: ramp up 5 vus em 5s;
//     carga 5 vus por 5s;
//     ramp up 50 vus em 2s;
//     carga de 50 vus em 2s;
//     ramp down 0 vu em 5s
//     limite: requisicoes com falha < 1%;

import { check, sleep } from 'k6'
import http from 'k6/http'
import { SharedArray } from 'k6/data'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

export const options = {
    stages: [
        {duration: '5s', target: 5},
        {duration: '5s', target: 5},
        {duration: '2s', target: 50},
        {duration: '2s', target: 50},
        {duration: '5s', target: 0}
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01']
    }
}

const csvData = new SharedArray('Leitura csv', function() {
    return papaparse.parse(open('users.csv'), {header: true}).data
})

export default function() {
    const USER = csvData[Math.floor(Math.random() * csvData.length)].email
    const PASS = 'user123'
    const BASE_URL = 'http://localhost:8080'

    const res = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USER,
        password: PASS
    })

    check(res, {
        'sucesso login': (r) => r.status === 200,
        'token gerado': (r) => r.json('access') !== ''
    })

    sleep(1)
}
