//default
import http, { request } from 'k6/http'
import { check } from 'k6'
//remoto
import { AWSConfig, S3Cliente} from 'https://jslib.k6.io/aws/0.4.0/s3.js' //preferencia por usar modulos deste site jslib
//local
import runTest from './requisicoesHTTP'


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