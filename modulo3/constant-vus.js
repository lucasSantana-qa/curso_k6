import http from 'k6/http';
import { sleep } from 'k6'

export const options = {
    scenarios: {
        contacts: {
            executor: 'constant-vus',
            vus: 10,
            duration: '30s'
        }
    }
}

export default function() {
    const res = http.get('https://test.k6.io/contacts.php')
    sleep(0.5)
}