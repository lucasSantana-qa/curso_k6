import http, { request } from 'k6/http'
import { check, group } from 'k6'

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        'http_req_duration{group:::requisição_por_id}': ['p(95) < 500'],
        'http_req_duration{group:::requisição_todos_crocs}': ['p(95) < 500']
    }

}

export default function() {
    group('requisição_todos_crocs', function() {
        const res1 = http.get('http://test-api.k6.io/public/crocodiles')
        check(res1, {
            'status code é 200 get all': (res) => res.status === 200
        })
    })

    group('requisição_por_id', function() {
        const res2 = http.get('http://test-api.k6.io/public/crocodiles/1')
        check(res2, {
            'status code é 200 get id': (res) => res.status === 200
        })
    })
}