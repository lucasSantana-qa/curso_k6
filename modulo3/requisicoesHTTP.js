import http, { request } from 'k6/http'

export const options = {
    vus: 1,
    duration: '3s'
}

export default function() {
    const res = http.get('http://test.k6.io')
    check(res, {
        'status code é 200': (res) => res.status === 200
    })
}