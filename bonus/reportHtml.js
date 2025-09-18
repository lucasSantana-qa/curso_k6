// //Public api: buscar todos os crocodilos
// Critérios: 
//     smoke test: 1 usuario por 30 segundos
//     limite: requisições com sucesso > 99%

import { check } from 'k6'
import http from 'k6/http'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 1,
    duration: '30s',
    thresholds: {
        checks: ['rate > 0.99']
    }
}

export default function() {
    const BASE_URL = 'http://localhost:8080'
    const res = http.get(`${BASE_URL}/public/crocodiles/`)

    check(res, {
        'status code 200': (res) => res.status === 200
    })
}

export function handleSummary(data) {
    return {
        "teste_k6.html": htmlReport(data)
    }
}