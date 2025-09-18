import http, { request } from 'k6/http'
import { check, group } from 'k6'

export const options = {
    vus: 5,
    duration: '3s',
    tags: {
        name: 'meu-teste'
    },
    thresholds: {
        'http_req_duration{tipo:busca-todos}': ['p(95) < 500'] //avalia apenas a métrica do tipo=busca-todos
    }

}

export default function() {
    group('requisição_todos_crocs', function() {
        const res1 = http.get('http://test-api.k6.io/public/crocodiles', {
            tags: {
                tipo: "busca-todos"
            }   
        })
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