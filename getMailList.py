import requests

headers = {
    'accept': 'application/json',
    'Authorization': 'Bearer XXXXXXXXXXX',
}

response = requests.get(
    'https://admin.lovelacehackathon.com/api/docs/aaYvahhciDrtFrFytKRZwy/tables/Users/records',
    headers=headers,
)

console.log(response.json())