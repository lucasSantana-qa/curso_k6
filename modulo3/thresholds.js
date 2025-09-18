import http, { request } from 'k6/http'
import { check } from 'k6'
import { Rate } from 'k6/metrics'

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: [{threshold: 'p(95) < 200', abortOnFail: true, delayAbortEval: '10'}],
        checks: ['rate > 0.99']
    }
}

export default function() {
    const res = http.get('http://test.k6.io')
    check(res, {
        'status code é 200': (res) => res.status === 201
    })
}