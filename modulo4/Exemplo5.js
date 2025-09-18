// Public api: GET crocodilos e GET crocodilos por id
// Critérios: 
// RPS de 200 REQ/s para a API de listagem de crocodilos durante 30s
// Para busca por id, atender 50 usuários onde cada usuário realiza até 20 solicitações em até 1 min
// Usuários par devem realizar buscas ao crocodilo de ID 2 
// Usuários impar devem realizar buscas ao crocodilo de ID 1
// Ambos os testes devem ser executados simultaneamente

import http from 'k6/http'

export const options = {
    scenarios: {
        listar: {
            executor: 'constant-arrival-rate',
            exec: 'listar',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVus: 150,
            tags: {test_type: 'listagem_de_crocodilos'}
        },
        buscar: {
            executor: 'per-vu-iterations',
            exec: 'buscar',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            tags: {test_type: 'busca_de_crocodilos'}
        }
    }

}

export function listar() {
    http.get(__ENV.URL+'/crocodiles')   
}

export function buscar() {
    if (__VU % 2 === 0) { // __VU acessa a vu atual que está sendo executada
        http.get(__ENV.URL+'/public/crocodiles/2/')   
    } else {
        http.get(__ENV.URL+'/public/crocodiles/1/')   
    }
}