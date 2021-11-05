<h1 align="center">Unofficial Amikom Career API</h1>

> A web API is a programmatic interface consisting of one or more publicly exposed endpoints to a defined request–response message system, typically expressed in JSON or XML, which is exposed via the web—most commonly by means of an HTTP-based web server.

Unofficial Amikom Career API adalah website yang menyediakan data lowongan kerja yang ada di website https://careers.amikom.ac.id . Data yang digunakan adalah data hasil scraping menggunakan library `cheerio` untuk menerjemahkan html menjadi javascript dan `axios` sebagai http client.

Project ini menggunakan bahasa typescript dan framework nextjs versi 12.

### Instalasi

Untuk menjalankan project ini di komputer local, ketikkan perintah berikut.

```
git clone https://github.com/RobyCigar/amikom-career-api/
cd amikom-career-api
npm install
npm run dev
```

### Penggunaan

```
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000/api/lowongan
```

### Endpoint

BASE = http://localhost:3000/api/

Mendapatkan Lowongan

GET

```
{BASE}/lowongan
```

```
{BASE}/lowongan?page=3
```

Mendapatkan Detail Lowongan

GET

```
{BASE}/lowongan/{SLUG}
```
