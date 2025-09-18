import http from 'k6/http';
import { sleep } from 'k6'

export default function() {
    const BASE_URL = __ENV.URL;

    const res = http.get(BASE_URL)

    sleep(1)
}