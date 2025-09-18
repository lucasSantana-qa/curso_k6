// //Public api: registrar novo usuário
// Critérios: 
//     performance test: carga 10vus por 10s
//     limite: requisições com sucesso > 95%;
//     requisicoes com falha < 1%;
//     tempo requisicao p(95) < 500 

import { check, sleep } from 'k6'
import http from 'k6/http'

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
}


export default function() {
    const USER = `${Math.random()}@mail.com`
    const PASS = 'user123'
    const BASE_URL = 'http://localhost:8080'

    console.log(USER + PASS)
    const res = http.post(`${BASE_URL}/user/register/`, {
        username: USER,
        first_name: 'teste',
        last_name: 'ksix',
        email: USER,
        password: PASS
    })

    check(res, {
        'sucesso ao registrar': (res) => res.status === 201
    })

    sleep(1)
}