// //Public api: buscar todos os crocodilos
// Critérios: 
//     smoke test: 1 usuario por 30 segundos
//     limite: requisições com sucesso > 99%

import { check, sleep } from 'k6'
import http from 'k6/http'

export const options = {
    vus: 5,
    duration: '60s'
}

export default function() {
    const BASE_URL = 'http://localhost:8080/public/crocodiles/'

    const res = http.get(BASE_URL)

    sleep(1)
}