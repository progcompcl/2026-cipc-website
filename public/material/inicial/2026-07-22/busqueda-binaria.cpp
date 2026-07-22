#include <bits/stdc++.h>

using namespace std;
typedef long long ll;

// Busqueda binaria estándar
// Resumen:
// - Definir bien el espacio de busqueda inicial [l,r]
// - La respuesta debe estar en ese espacio inicial
// - La condición que evalúan debe ser monótona en ese espacio
// - Al final, l y r quedan en el "corte" (donde la función cambia de valor)
ll sqrt_floor(ll x){
  // calcula raiz(x)
  ll l = 0, r = x;
  ll mid;

  // Encontramos el último mid tal que mid*mid <= x
  // Esto nos da el piso(raiz(x)).
  // La respuesta queda en "l", que queda en el último valor
  // que cumple la condición
  while(r-l > 1){
    mid = (l+r)/2;
    if(mid*mid <= x){
      l = mid;
    }
    else{
      r = mid;
    }
  }
  return l;
}

// Busqueda binaria en los reales
// Cambiamos l,r,mid y agregar un EPS
double sqrt_double(ll x){
  // calcula raiz(x)
  double l = 0, r = x;
  double mid;

  double EPS = 1e-8;

  // En algunos casos puede convenir fijar la cantidad
  // de iteraciones en vez de usar un EPS. Usualmente
  // se usan valores cercanos a 40-60.
  while(r-l > EPS){
    mid = (l+r)/2;
    if(mid*mid <= x){
      l = mid;
    }
    else{
      r = mid;
    }
  }

  // Acá la respuesta puede ser l o r, ya que están a distancia EPS
  return l;
}

int main(){

  ll n;
  cin >> n;
  cout << sqrt_floor(n) << '\n';
  cout << sqrt_double(n) << '\n';

}
