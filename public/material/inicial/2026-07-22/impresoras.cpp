#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

// Resuelve el problema
// "Factory Machines" de CSES
// https://cses.fi/problemset/task/1620/
int main(){

  int n, k;
  cin >> n >> k;

  vector<ll> a(n);
  for(int i=0; i<n; i++) cin >> a[i];

  ll l=0, r=1e18, mid;

  while(r-l > 1){
    mid = (l+r)/2;

    // usualmente la dificultad en problemas
    // de buscar binariamente sobre la respuesta
    // está en chequear la condición. Acá contamos
    // cuántas figuras podemos imprimir en "mid" segundos.
    ll total=0;
    for(int i=0; i<n; i++){
      total += mid/a[i]; // agregamos lo que produce la impresora i en mid segundos.
      if(total >= k) break; // evitamos overflow cortando prematuramente
    }

    // esta condición se cumple desde cierto t* en adelante, que es la
    // respuesta que buscamos. Cuando se cumple descartamos la derecha (r = mid)
    // y si no la izquierda (l = mid).
    if(total >= k) r = mid;
    else l = mid;
  }
  cout << r << '\n';
}
