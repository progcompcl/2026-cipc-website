---
marp: true
paginate: true
math: katex
header: Complejidad y estructuras de datos
footer: Campamento Invernal de Programación Competitiva
---

<style>
section:not(.title) svg text {
  paint-order: stroke fill;
  stroke: #ffffff;
  stroke-width: 3px;
  stroke-linejoin: round;
}
section:not(.title) svg text[fill="#ffffff"],
section:not(.title) svg text[fill="#fff3e0"],
section:not(.title) svg text[fill="#b9c4de"],
section:not(.title) svg text[fill="#c9c9c9"],
section:not(.title) svg tspan[fill="#ffffff"],
section:not(.title) svg tspan[fill="#fff3e0"],
section:not(.title) svg g[fill="#ffffff"] text {
  stroke: #000000;
}
section:not(.title) svg g[fill="#ffffff"] text[fill="#15214c"],
section:not(.title) svg g[fill="#ffffff"] text[fill="#2e7d32"],
section:not(.title) svg g[fill="#ffffff"] text[fill="#e27d00"],
section:not(.title) svg g[fill="#ffffff"] text[fill="#c62828"] {
  stroke: #ffffff;
}
</style>

<!-- _class: title -->

# Complejidad y estructuras de datos

<ul class="author">
  <li>Sebastián Torrealba</li>
  <li>sebastian.torrealba@sansano.usm.cl</li>
</ul>

---

# Requisitos

Se asume familiaridad básica con:

- **C++ básico**: variables, if/else, for y while.
- **Funciones** y el contenedor vector.
- Nada más: la complejidad y las estructuras las vemos **hoy desde cero**.

<svg viewBox="0 0 960 74" xmlns="http://www.w3.org/2000/svg" style="width:72%;display:block;margin:2em auto 0" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="15" y="14" width="930" height="46" rx="23" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="480" y="43" font-size="19" fill="#15214c">Si sabes escribir un <tspan font-weight="bold">for</tspan> que recorre un vector, estás listo.</text>
</svg>

<small><em>No necesitas conocer ningún algoritmo de antemano: todo lo demás lo construimos paso a paso.</em></small>

---

# Mapa de la clase

<svg viewBox="0 0 960 300" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="40" y="24" width="390" height="64" rx="12" fill="#15214c"/>
<text x="235" y="64" font-size="25" fill="#ffffff" font-weight="bold">Complejidad</text>
<rect x="52" y="104" width="366" height="46" rx="23" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="235" y="134" font-size="19" fill="#15214c">medir sin cronómetro</text>
<rect x="52" y="164" width="366" height="46" rx="23" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="235" y="194" font-size="19" fill="#15214c">notación O</text>
<rect x="52" y="224" width="366" height="46" rx="23" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="235" y="254" font-size="19" fill="#15214c">estimar el tiempo</text>
<path d="M436 56 L522 56 M522 56 L510 48 M522 56 L510 64" stroke="#e27d00" stroke-width="5" fill="none"/>
<rect x="530" y="24" width="390" height="64" rx="12" fill="#e27d00"/>
<text x="725" y="64" font-size="25" fill="#ffffff" font-weight="bold">Estructuras de datos</text>
<rect x="542" y="104" width="366" height="46" rx="23" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="725" y="134" font-size="19" fill="#15214c">pila · cola · deque</text>
<rect x="542" y="164" width="366" height="46" rx="23" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="725" y="194" font-size="19" fill="#15214c">priority_queue</text>
<rect x="542" y="224" width="366" height="46" rx="23" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="725" y="254" font-size="19" fill="#15214c">set · map</text>
</svg>

Primero aprendemos a **medir qué tan rápido** es un algoritmo, luego **herramientas listas para usar**.

---

# Complejidad en programación competitiva

En programación competitiva hay **límites de tiempo estrictos**.

Un programa que exceda el límite recibe el veredicto **TLE** (Time Limit Exceeded).

Necesitamos estimar qué tan rápido correrá nuestro código **antes de enviarlo**.

<svg viewBox="0 0 960 250" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
  <rect x="48" y="92" width="200" height="66" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
  <text x="148" y="132" font-size="21" fill="#15214c">tu programa</text>
  <path d="M252 125 L322 125 M322 125 L312 119 M322 125 L312 131" stroke="#9aa4b2" stroke-width="3" fill="none"/>
  <rect x="330" y="70" width="250" height="110" rx="12" fill="#15214c"/>
  <text x="455" y="112" font-size="26" fill="#ffffff" font-weight="bold">Juez</text>
  <text x="455" y="146" font-size="17" fill="#b9c4de">mide el tiempo</text>
  <path d="M580 125 L626 125" stroke="#9aa4b2" stroke-width="3" fill="none"/>
  <path d="M626 125 L626 92 L684 92 M684 92 L674 88 M684 92 L674 96" stroke="#2e7d32" stroke-width="3" fill="none"/>
  <path d="M626 125 L626 158 L684 158 M684 158 L674 154 M684 158 L674 162" stroke="#c62828" stroke-width="3" fill="none"/>
  <rect x="688" y="65" width="224" height="54" rx="27" fill="#2e7d32"/>
  <text x="800" y="99" font-size="18" fill="#ffffff" font-weight="bold">AC · dentro del límite</text>
  <rect x="688" y="131" width="224" height="54" rx="27" fill="#c62828"/>
  <text x="800" y="165" font-size="18" fill="#ffffff" font-weight="bold">TLE · excede el límite</text>
</svg>

---

# ¿Cuánto se demora mi programa?

Medir con **cronómetro** depende del entorno: hardware, lenguaje, compilador.

Buscamos un **modelo teórico** que anticipe el rendimiento.

Hoy aprenderemos a **estimar ese tiempo** de forma práctica.

<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
  <rect x="56" y="40" width="384" height="160" rx="14" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
  <text x="248" y="88" font-size="24" fill="#15214c" font-weight="bold">Cronómetro</text>
  <text x="248" y="124" font-size="18" fill="#6b6b6b">depende del entorno</text>
  <text x="248" y="166" font-size="17" fill="#c62828">hardware · lenguaje · compilador</text>
  <text x="480" y="128" font-size="24" fill="#8a94a6" font-weight="bold">vs</text>
  <rect x="520" y="40" width="384" height="160" rx="14" fill="#15214c"/>
  <text x="712" y="88" font-size="24" fill="#ffffff" font-weight="bold">Modelo teórico</text>
  <text x="712" y="124" font-size="18" fill="#b9c4de">independiente del entorno</text>
  <text x="712" y="166" font-size="19" fill="#e27d00" font-weight="bold">predice el rendimiento</text>
</svg>

---

# ¿Cuál algoritmo es más rápido?

Supongamos dos algoritmos que resuelven el **mismo problema**. ¿Cuál elijo?

<svg viewBox="0 0 960 320" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
  <rect x="40" y="72" width="188" height="54" rx="27" fill="#15214c"/>
  <text x="134" y="106" font-size="20" fill="#ffffff" font-weight="bold">Algoritmo A</text>
  <rect x="40" y="196" width="188" height="54" rx="27" fill="#15214c"/>
  <text x="134" y="230" font-size="20" fill="#ffffff" font-weight="bold">Algoritmo B</text>
  <path d="M232 99 L322 120 M322 120 L311 117 M322 120 L314 126" stroke="#9aa4b2" stroke-width="3" fill="none"/>
  <path d="M232 223 L322 202 M322 202 L314 196 M322 202 L311 205" stroke="#9aa4b2" stroke-width="3" fill="none"/>
  <rect x="330" y="50" width="320" height="222" rx="16" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
  <text x="490" y="90" font-size="23" fill="#15214c" font-weight="bold">Abstracción</text>
  <text x="490" y="118" font-size="17" fill="#6b6b6b">cancela lo externo</text>
  <text x="490" y="160" font-size="19" fill="#8a94a6">lenguaje</text>
  <path d="M418 154 L562 154" stroke="#c62828" stroke-width="3" fill="none"/>
  <text x="490" y="198" font-size="19" fill="#8a94a6">hardware</text>
  <path d="M418 192 L562 192" stroke="#c62828" stroke-width="3" fill="none"/>
  <text x="490" y="236" font-size="19" fill="#8a94a6">SO · compilador</text>
  <path d="M402 230 L578 230" stroke="#c62828" stroke-width="3" fill="none"/>
  <path d="M656 161 L714 161 M714 161 L704 155 M714 161 L704 167" stroke="#9aa4b2" stroke-width="3" fill="none"/>
  <rect x="720" y="126" width="206" height="74" rx="16" fill="#e27d00"/>
  <text x="823" y="160" font-size="20" fill="#ffffff" font-weight="bold">cómo escala</text>
  <text x="823" y="186" font-size="20" fill="#ffffff" font-weight="bold">con n</text>
</svg>

Factores externos que estorban la comparación: **lenguaje**, **potencia del computador**, **sistema operativo** y **compilador**.

Necesitamos una herramienta que **abstraiga** esos factores y deje solo cómo escala con $n$.

---

# Estimar sin fórmula exacta

Analogía: para **estimar una masa** no siempre necesitas la fórmula exacta.

Basta saber **a qué ritmo crece** para predecir su valor cuando el tamaño aumenta.

<svg viewBox="0 0 960 330" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
  <text x="44" y="155" font-size="17" fill="#6b6b6b" text-anchor="start">tamaño</text>
  <text x="44" y="236" font-size="17" fill="#e27d00" text-anchor="start" font-weight="bold">costo</text>
  <rect x="160" y="110" width="40" height="40" rx="8" fill="#eef1f7" stroke="#15214c" stroke-width="2"/>
  <rect x="445" y="80" width="70" height="70" rx="8" fill="#eef1f7" stroke="#15214c" stroke-width="2"/>
  <rect x="725" y="40" width="110" height="110" rx="8" fill="#eef1f7" stroke="#15214c" stroke-width="2"/>
  <text x="330" y="140" font-size="18" fill="#6b6b6b">×2</text>
  <text x="630" y="140" font-size="18" fill="#6b6b6b">×2</text>
  <text x="180" y="178" font-size="20" fill="#15214c" font-weight="bold">n = 1</text>
  <text x="480" y="178" font-size="20" fill="#15214c" font-weight="bold">n = 2</text>
  <text x="780" y="178" font-size="20" fill="#15214c" font-weight="bold">n = 4</text>
  <rect x="142" y="205" width="76" height="52" rx="16" fill="#e27d00"/>
  <text x="180" y="239" font-size="22" fill="#ffffff" font-weight="bold">1</text>
  <rect x="428" y="205" width="104" height="52" rx="16" fill="#e27d00"/>
  <text x="480" y="239" font-size="22" fill="#ffffff" font-weight="bold">8</text>
  <rect x="690" y="205" width="180" height="52" rx="16" fill="#e27d00"/>
  <text x="780" y="239" font-size="22" fill="#ffffff" font-weight="bold">64</text>
  <text x="330" y="238" font-size="18" fill="#15214c" font-weight="bold">×8</text>
  <text x="630" y="238" font-size="18" fill="#15214c" font-weight="bold">×8</text>
  <text x="480" y="305" font-size="20" fill="#15214c" font-weight="bold">conociendo el ritmo, predecimos el costo futuro</text>
</svg>

**Conocer la velocidad a la que escala** una cantidad permite predecir su valor, aunque no tengamos la fórmula exacta.

---

# ¿Qué buscamos entonces?

Queremos decir **a qué ritmo crece el trabajo** de un algoritmo cuando la entrada $n$ crece.

<svg viewBox="0 0 960 220" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
  <rect x="40" y="66" width="248" height="96" rx="12" fill="#15214c"/>
  <text x="164" y="108" font-size="22" fill="#ffffff" font-weight="bold">la entrada n crece</text>
  <text x="164" y="138" font-size="17" fill="#b9c4de">n → grande</text>
  <path d="M288 114 L360 114 M360 114 L350 108 M360 114 L350 120" stroke="#9aa4b2" stroke-width="3" fill="none"/>
  <rect x="360" y="56" width="248" height="116" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
  <text x="484" y="104" font-size="21" fill="#15214c" font-weight="bold">¿a qué ritmo</text>
  <text x="484" y="134" font-size="21" fill="#15214c" font-weight="bold">crece el trabajo?</text>
  <path d="M608 114 L680 114 M680 114 L670 108 M680 114 L670 120" stroke="#9aa4b2" stroke-width="3" fill="none"/>
  <rect x="680" y="66" width="240" height="96" rx="12" fill="#e27d00"/>
  <text x="800" y="106" font-size="22" fill="#ffffff" font-weight="bold">Notación</text>
  <text x="800" y="138" font-size="20" fill="#ffffff" font-weight="bold">asintótica O(·)</text>
</svg>

Esa forma es la **notación asintótica** (Big-O), que vemos ahora.

---

# Una métrica independiente

Queremos una función $T(n)$ que mida el **trabajo** de un algoritmo según el tamaño de la entrada $n$.

Para comparar dos algoritmos, comparamos $T_1(n)$ contra $T_2(n)$.

<svg viewBox="0 0 960 290" xmlns="http://www.w3.org/2000/svg" style="width:92%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="90" y="26" width="320" height="96" rx="12" fill="#15214c"/>
<text x="250" y="66" font-size="24" fill="#ffffff" font-weight="bold">Algoritmo 1</text>
<text x="250" y="100" font-size="20" fill="#b9c4de">T₁(n)</text>
<rect x="550" y="26" width="320" height="96" rx="12" fill="#15214c"/>
<text x="710" y="66" font-size="24" fill="#ffffff" font-weight="bold">Algoritmo 2</text>
<text x="710" y="100" font-size="20" fill="#b9c4de">T₂(n)</text>
<rect x="437" y="51" width="86" height="46" rx="23" fill="#e27d00"/>
<text x="480" y="81" font-size="20" fill="#ffffff" font-weight="bold">vs</text>
<rect x="90" y="160" width="780" height="108" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="480" y="204" font-size="22" fill="#c62828" font-weight="bold">calcular T(n) exacto: casi imposible</text>
<text x="480" y="240" font-size="19" fill="#6b6b6b">depende de constantes ocultas y del hardware</text>
</svg>

El **valor exacto** de $T(n)$ es casi imposible de conocer: cada máquina y cada detalle cambia el número.

---

# La solución: mirar el crecimiento

Renunciamos a la **constante exacta**.

Nos fijamos en **cómo crece** $T(n)$ cuando $n$ aumenta.

<svg viewBox="0 0 960 250" xmlns="http://www.w3.org/2000/svg" style="width:92%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="70" y="55" width="330" height="130" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="235" y="98" font-size="22" fill="#15214c" font-weight="bold">número exacto</text>
<text x="235" y="128" font-size="18" fill="#6b6b6b">de operaciones</text>
<text x="235" y="162" font-size="19" fill="#c62828" font-weight="bold">lo soltamos</text>
<path d="M410 120 L556 120 M556 120 L542 112 M556 120 L542 128" stroke="#e27d00" stroke-width="5" fill="none"/>
<rect x="560" y="55" width="330" height="130" rx="12" fill="#15214c"/>
<text x="725" y="98" font-size="22" fill="#ffffff" font-weight="bold">cómo crece T(n)</text>
<text x="725" y="128" font-size="18" fill="#b9c4de">cuando n aumenta</text>
<text x="725" y="162" font-size="19" fill="#e27d00" font-weight="bold">el ritmo, no el número</text>
</svg>

Frase clave: nos importa el **ritmo de crecimiento**, no el número exacto.

---

# Crecimiento de funciones

Comparemos $f(n) = n^2$ (azul) contra $g(n) = 100\,n$ (naranjo).

<svg viewBox="0 0 960 380" xmlns="http://www.w3.org/2000/svg" style="width:88%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<line x1="90" y1="40" x2="90" y2="320" stroke="#6b6b6b" stroke-width="2.5"/>
<path d="M90 40 L85 53 M90 40 L95 53" stroke="#6b6b6b" stroke-width="2.5" fill="none"/>
<line x1="90" y1="320" x2="912" y2="320" stroke="#6b6b6b" stroke-width="2.5"/>
<path d="M912 320 L899 315 M912 320 L899 325" stroke="#6b6b6b" stroke-width="2.5" fill="none"/>
<text x="132" y="32" font-size="17" fill="#6b6b6b">T(n)</text>
<line x1="495" y1="250" x2="495" y2="320" stroke="#8a94a6" stroke-width="2.5" stroke-dasharray="6 6"/>
<path d="M90 320 L191 316 L292 302 L394 281 L495 250 L596 211 L697 162 L799 106 L900 40" stroke="#15214c" stroke-width="4" fill="none" stroke-linejoin="round"/>
<path d="M90 320 L900 180" stroke="#e27d00" stroke-width="4" fill="none"/>
<circle cx="495" cy="250" r="7" fill="#e27d00"/>
<text x="495" y="340" font-size="16" fill="#15214c" font-weight="bold">cruce en n = 100</text>
<text x="501" y="366" font-size="16" fill="#6b6b6b">n (tamaño de la entrada)</text>
<text x="712" y="96" font-size="19" fill="#15214c" font-weight="bold">f(n) = n²</text>
<text x="838" y="216" font-size="19" fill="#e27d00" font-weight="bold">g(n) = 100 n</text>
<text x="252" y="150" font-size="17" fill="#e27d00" font-weight="bold">n &lt; 100 → g mayor</text>
<text x="704" y="300" font-size="17" fill="#15214c" font-weight="bold">n &gt; 100 → f se dispara</text>
</svg>

Para $n$ chico, $g$ es mayor. Pero desde $n > 100$, **$f(n)$ domina** y la diferencia se dispara.

---

# Notación O (Big-O)

$O(f)$ describe cómo crece $T(n)$ **ignorando** constantes y detalles de hardware.

Idea: $f(n)$ es $O(g(n))$ si a partir de cierto $n_0$, la curva $c\cdot g(n)$ (con una constante $c>0$) siempre queda **por encima** de $f(n)$.

<svg viewBox="0 0 960 340" xmlns="http://www.w3.org/2000/svg" style="width:88%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="430" y="55" width="480" height="225" fill="#eef1f7"/>
<line x1="90" y1="40" x2="90" y2="280" stroke="#6b6b6b" stroke-width="2.5"/>
<path d="M90 40 L85 53 M90 40 L95 53" stroke="#6b6b6b" stroke-width="2.5" fill="none"/>
<line x1="90" y1="280" x2="912" y2="280" stroke="#6b6b6b" stroke-width="2.5"/>
<path d="M912 280 L899 275 M912 280 L899 285" stroke="#6b6b6b" stroke-width="2.5" fill="none"/>
<text x="898" y="305" font-size="17" fill="#6b6b6b">n</text>
<line x1="430" y1="280" x2="430" y2="95" stroke="#8a94a6" stroke-width="2.5" stroke-dasharray="6 6"/>
<path d="M90 205 C 220 178, 340 160, 430 155 C 600 143, 760 132, 910 122" stroke="#15214c" stroke-width="4" fill="none"/>
<path d="M110 268 C 260 235, 380 178, 430 155 C 560 118, 760 78, 910 55" stroke="#e27d00" stroke-width="4" fill="none"/>
<circle cx="430" cy="155" r="6" fill="#15214c"/>
<rect x="320" y="6" width="320" height="42" rx="21" fill="#e27d00"/>
<text x="480" y="34" font-size="22" fill="#ffffff" font-weight="bold">f(n) es O(g(n))</text>
<text x="430" y="303" font-size="18" fill="#15214c" font-weight="bold">n₀</text>
<text x="858" y="150" font-size="19" fill="#15214c" font-weight="bold">f(n)</text>
<text x="846" y="46" font-size="19" fill="#e27d00" font-weight="bold">c · g(n)</text>
<text x="668" y="262" font-size="17" fill="#e27d00" font-weight="bold">desde aquí, c·g(n) domina</text>
</svg>

<small>No nos preocupamos por el valor exacto de $c$ ni de $n_0$: basta con que **existan**.</small>

---

# Ignoramos las constantes

El área de un cuadrado y la de un círculo crecen al **mismo ritmo**: proporcional al **cuadrado** del tamaño.

<svg viewBox="0 0 960 300" xmlns="http://www.w3.org/2000/svg" style="width:90%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="40" y="20" width="400" height="215" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<text x="240" y="50" font-size="22" fill="#15214c" font-weight="bold">Cuadrado</text>
<rect x="194" y="62" width="92" height="92" rx="6" fill="#15214c"/>
<text x="240" y="176" font-size="18" fill="#6b6b6b">lado L</text>
<text x="240" y="205" font-size="20" fill="#15214c" font-weight="bold">área = L²</text>
<rect x="520" y="20" width="400" height="215" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<text x="720" y="50" font-size="22" fill="#15214c" font-weight="bold">Círculo</text>
<circle cx="720" cy="108" r="46" fill="#15214c"/>
<line x1="720" y1="108" x2="766" y2="108" stroke="#e27d00" stroke-width="3"/>
<text x="743" y="100" font-size="16" fill="#e27d00" font-weight="bold">r</text>
<text x="720" y="176" font-size="18" fill="#6b6b6b">radio r</text>
<text x="720" y="205" font-size="20" fill="#15214c" font-weight="bold">área = π · r²</text>
<rect x="230" y="252" width="500" height="42" rx="21" fill="#e27d00"/>
<text x="480" y="280" font-size="19" fill="#ffffff" font-weight="bold">el π es una constante: se ignora</text>
</svg>

El área del cuadrado es $O(L^2)$. El área del círculo es $\pi r^2$, y también es $O(r^2)$.

**Moraleja:** en Big-O botamos las constantes multiplicativas y los términos de menor orden.

---

# Dos reglas prácticas

**Regla de la suma** · dos partes en secuencia: nos quedamos con la más grande.

$$f_1 \in O(g),\; f_2 \in O(h) \;\Rightarrow\; f_1 + f_2 \in O(\max(g,h))$$

**Regla del producto** · algo $O(g)$ anidado dentro de algo $O(h)$: se multiplican.

$$f_1 \in O(g),\; f_2 \in O(h) \;\Rightarrow\; f_1 \cdot f_2 \in O(g\cdot h)$$

<svg viewBox="0 0 960 205" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="240" y="30" font-size="20" fill="#15214c" font-weight="bold">Suma → gana la mayor</text>
<rect x="45" y="54" width="120" height="52" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="105" y="88" font-size="22" fill="#15214c" font-weight="bold">O(g)</text>
<text x="200" y="90" font-size="26" fill="#6b6b6b">+</text>
<rect x="235" y="54" width="120" height="52" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="295" y="88" font-size="22" fill="#15214c" font-weight="bold">O(h)</text>
<path d="M240 108 L240 146 M240 146 L233 135 M240 146 L247 135" stroke="#9aa4b2" stroke-width="3" fill="none"/>
<rect x="118" y="150" width="244" height="46" rx="23" fill="#e27d00"/>
<text x="240" y="180" font-size="20" fill="#ffffff" font-weight="bold">O(máx(g, h))</text>
<text x="725" y="30" font-size="20" fill="#15214c" font-weight="bold">Producto → se anidan</text>
<rect x="575" y="52" width="300" height="70" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="620" y="76" font-size="16" fill="#6b6b6b">O(h)</text>
<rect x="640" y="82" width="170" height="34" rx="10" fill="#15214c"/>
<text x="725" y="106" font-size="18" fill="#ffffff" font-weight="bold">O(g)</text>
<path d="M725 124 L725 146 M725 146 L718 135 M725 146 L732 135" stroke="#9aa4b2" stroke-width="3" fill="none"/>
<rect x="603" y="150" width="244" height="46" rx="23" fill="#e27d00"/>
<text x="725" y="180" font-size="20" fill="#ffffff" font-weight="bold">O(g · h)</text>
</svg>

---

# Jerarquía de complejidades

De más rápida a más lenta:

$$O(1) < O(\log n) < O(\sqrt{n}) < O(n) < O(n\log n) < O(n^2) < O(n^3) < O(2^n) < O(n!)$$

<svg viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg" style="width:70%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<line x1="88" y1="52" x2="88" y2="340" stroke="#9aa4b2" stroke-width="2.5"/>
<line x1="88" y1="340" x2="924" y2="340" stroke="#9aa4b2" stroke-width="2.5"/>
<path d="M88 52 L83 64 M88 52 L93 64" stroke="#9aa4b2" stroke-width="2.5" fill="none"/>
<path d="M924 340 L912 335 M924 340 L912 345" stroke="#9aa4b2" stroke-width="2.5" fill="none"/>
<text x="172" y="44" font-size="16" fill="#6b6b6b">operaciones</text>
<text x="858" y="366" font-size="16" fill="#6b6b6b">tamaño n</text>
<path d="M88 338 L160 292 L250 270 L380 254 L540 242 L720 232 L900 226" fill="none" stroke="#2e7d32" stroke-width="3.5"/>
<path d="M88 338 L180 300 L320 272 L480 250 L660 224 L900 192" fill="none" stroke="#2e7d32" stroke-width="3.5"/>
<path d="M88 338 L900 116" fill="none" stroke="#15214c" stroke-width="3.5"/>
<path d="M88 338 L260 300 L450 248 L630 180 L780 120 L900 72" fill="none" stroke="#6b6b6b" stroke-width="3.5"/>
<path d="M88 340 L280 326 L470 296 L630 246 L760 178 L860 100 L912 56" fill="none" stroke="#e27d00" stroke-width="3.5"/>
<path d="M92 340 L210 336 L320 322 L390 282 L440 214 L478 132 L500 58" fill="none" stroke="#c62828" stroke-width="3.5"/>
<text x="524" y="66" font-size="18" fill="#c62828" font-weight="bold">2ⁿ</text>
<text x="912" y="46" font-size="18" fill="#e27d00" font-weight="bold">n²</text>
<text x="838" y="58" font-size="17" fill="#6b6b6b" font-weight="bold">n log n</text>
<text x="912" y="110" font-size="18" fill="#15214c" font-weight="bold">n</text>
<text x="912" y="186" font-size="18" fill="#2e7d32" font-weight="bold">√n</text>
<text x="912" y="224" font-size="18" fill="#2e7d32" font-weight="bold">log n</text>
</svg>

Curvas planas escalan bien; las **empinadas explotan** al crecer $n$.

---

# Formulario útil

Suma de los primeros $n$ enteros:

$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2} = O(n^2)$$

<svg viewBox="0 0 960 180" xmlns="http://www.w3.org/2000/svg" style="width:80%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<line x1="330" y1="150" x2="640" y2="150" stroke="#c9c9c9" stroke-width="2"/>
<rect x="343" y="134" width="34" height="16" fill="#15214c"/>
<rect x="383" y="118" width="34" height="32" fill="#15214c"/>
<rect x="423" y="102" width="34" height="48" fill="#15214c"/>
<rect x="463" y="86" width="34" height="64" fill="#15214c"/>
<rect x="503" y="70" width="34" height="80" fill="#15214c"/>
<rect x="543" y="54" width="34" height="96" fill="#15214c"/>
<rect x="583" y="38" width="34" height="112" fill="#15214c"/>
<path d="M343 134 L617 38" stroke="#e27d00" stroke-width="3" fill="none" stroke-dasharray="7 5"/>
<text x="520" y="72" font-size="16" fill="#e27d00" font-weight="bold">medio cuadrado n × n</text>
<text x="480" y="174" font-size="16" fill="#6b6b6b">cada barra i aporta i · el total llena la mitad → O(n²)</text>
</svg>

Cambio de base de logaritmos:

$$\log_b a = \frac{\log_c a}{\log_c b}$$

<small>Como cambiar de base solo multiplica por una constante, en Big-O todos los logaritmos son equivalentes: escribimos $O(\log n)$ sin base.</small>

---

# ¿Cómo la leo en el código?

Una **operación elemental** cuesta $O(1)$: una operación aritmética o lógica, comparar, asignar, imprimir un dato.

Contamos **cuántas operaciones elementales** se ejecutan en función de $n$ y nos quedamos con el **orden de crecimiento**.

<svg viewBox="0 0 960 210" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="25" y="40" width="290" height="140" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<rect x="335" y="40" width="290" height="140" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<rect x="645" y="40" width="290" height="140" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<text x="170" y="90" font-size="20" fill="#15214c" font-weight="bold">Un bucle de n pasos</text>
<text x="170" y="138" font-size="23" fill="#e27d00" font-weight="bold">multiplica por n</text>
<text x="480" y="90" font-size="20" fill="#15214c" font-weight="bold">Bucles anidados</text>
<text x="480" y="138" font-size="23" fill="#e27d00" font-weight="bold">se multiplican</text>
<text x="790" y="90" font-size="20" fill="#15214c" font-weight="bold">No depende de n</text>
<text x="790" y="138" font-size="23" fill="#e27d00" font-weight="bold">queda en O(1)</text>
</svg>

<small>Regla mental: cuenta los bucles y de qué depende cada uno.</small>

---

# Ejemplo 1: un bucle

```cpp
int suma = 0;
for (int i = 0; i < n; i++)
    suma += 5;
```

El cuerpo del bucle se ejecuta $n$ veces, y cada vez hace una operación elemental.

Respuesta: **$O(n)$**.

---

# Ejemplo 2: bucles anidados

```cpp
int suma = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        suma += 2;
```

Por cada uno de los $n$ pasos del bucle externo, el interno hace $n$ pasos: $n \cdot n = n^2$.

Respuesta: **$O(n^2)$**.

---

# Ejemplo 3: triángulo

```cpp
int suma = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < i; j++)
        suma += 1;
```

El interno hace $0, 1, 2, \ldots, n-1$ pasos:
$$\sum_{i=0}^{n-1} i = \frac{n(n-1)}{2}$$

<svg viewBox="0 0 960 280" xmlns="http://www.w3.org/2000/svg" style="width:52%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="210" y="44" width="180" height="180" rx="6" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<polygon points="210,44 210,224 390,224" fill="#e27d00" opacity="0.9"/>
<path d="M210 44 L390 224" stroke="#15214c" stroke-width="2" fill="none"/>
<text x="266" y="188" font-size="20" fill="#ffffff" font-weight="bold">≈ mitad</text>
<text x="300" y="250" font-size="17" fill="#6b6b6b">n</text>
<text x="192" y="140" font-size="17" fill="#6b6b6b">n</text>
<rect x="460" y="80" width="460" height="120" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="690" y="126" font-size="20" fill="#15214c" font-weight="bold">celdas pintadas = n(n-1)/2</text>
<text x="690" y="166" font-size="19" fill="#6b6b6b">casi la mitad del cuadrado → <tspan fill="#e27d00" font-weight="bold">O(n²)</tspan></text>
</svg>

Respuesta: **$O(n^2)$**.

---

# Ejemplo 4: dos variables

```cpp
int suma = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        suma += n;
```

El externo hace $n$ pasos, el interno hace $m$ pasos. <em>No asumas que $m = n$.</em>

Respuesta: **$O(n\cdot m)$**.

---

# Ejemplo 5: condición con i*i

```cpp
int suma = 0;
for (int i = 0; (long long)i*i < n; i++)
    suma += 1;
```

El bucle corre mientras $i^2 < n$, es decir mientras $i < \sqrt{n}$.

Respuesta: **$O(\sqrt{n})$**.

---

# Ejemplo 6: se divide a la mitad

```cpp
for (int i = n; i > 0; i /= 2)
    cout << "hola" << endl;
```

$i$ se divide entre 2 cada vez: $n \to n/2 \to n/4 \to \cdots \to 1$, en total $\log_2 n$ pasos.

Respuesta: **$O(\log n)$**.

---

# Ejemplo 7: cuidado con la condición

```cpp
for (int i = 0; i < (n % 10); i++)
    cout << "cuidado" << endl;
```

$n \% 10$ es a lo más $9$: el bucle da **como mucho 9 pasos**, sin importar cuán grande sea $n$.

Respuesta: **$O(1)$**.

---

# Contar primos: primera versión

Contamos cuántos primos hay entre $2$ y $n$.

```cpp
bool es_primo(int x) {
    for (int i = 2; i < x; i++)
        if (x % i == 0) return false;
    return true;
}
int main() {
    int n; cin >> n;
    int contador = 0;
    for (int i = 2; i <= n; i++)
        if (es_primo(i)) contador++;
    cout << contador << endl;
}
```

- El bucle externo recorre ~$n$ valores y `es_primo(x)` prueba divisores hasta $x$.
- Costo total: $\sum_{i=2}^{n} i = \tfrac{n(n+1)}{2} \Rightarrow$ **$O(n^2)$**.

---

# Optimización: saltar los pares

El único par primo es el $2$: los demás pares no sirven, los saltamos.

```cpp
int main() {
    int n; cin >> n;
    int contador = 1; // cuenta el 2
    for (int i = 3; i <= n; i += 2)
        if (es_primo(i)) contador++;
    cout << contador << endl;
}
```

<small>La función `es_primo` es la misma de la versión anterior.</small>

- El bucle externo da solo $n/2$ pasos.
- Pero `es_primo` **sigue costando hasta $n$** por número.
- La constante $1/2$ no cambia el orden de crecimiento.
- **$O(n^2)$** <em>(más rápido en la práctica, misma clase)</em>

---

# Optimización: probar hasta √x

Si $x$ tiene un divisor $d > \sqrt{x}$, entonces $x/d < \sqrt{x}$ también lo divide.

$$d \cdot \frac{x}{d} = x \quad\Rightarrow\quad \text{basta llegar a } \lfloor\sqrt{x}\rfloor$$

```cpp
bool es_primo(int x) {
    for (int i = 2; (long long)i*i <= x; i++)
        if (x % i == 0) return false;
    return x >= 2;
}
```

- Ahora `es_primo(x)` cuesta $O(\sqrt{x})$.
- Total: $\displaystyle\sum_{i=2}^{n} \sqrt{i} = O(n\sqrt{n})$.
- **$O(n\sqrt{n})$**

---

# Criba de Eratóstenes

En vez de preguntar por cada número, **tachamos los múltiplos**.

```cpp
int main() {
    int n; cin >> n;
    vector<bool> es_primo(n + 1, true);
    es_primo[0] = es_primo[1] = false;
    for (int i = 2; i <= n; i++)
        if (es_primo[i])
            for (int j = 2*i; j <= n; j += i)
                es_primo[j] = false;
    int contador = 0;
    for (int i = 2; i <= n; i++)
        if (es_primo[i]) contador++;
    cout << contador << endl;
}
```

Cada número se tacha desde sus múltiplos: no se prueba uno por uno.

---

# Criba: por qué es casi lineal

<svg viewBox="0 0 960 200" xmlns="http://www.w3.org/2000/svg" style="width:80%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
  <text x="480" y="26" font-size="20" fill="#15214c" font-weight="bold">Tachamos múltiplos de 2 y de 3 · lo que sobra es primo</text>
  <rect x="42" y="50" width="54" height="70" rx="10" fill="#2e7d32"/><text x="69" y="95" font-size="26" fill="#ffffff" font-weight="bold">2</text>
  <rect x="102" y="50" width="54" height="70" rx="10" fill="#2e7d32"/><text x="129" y="95" font-size="26" fill="#ffffff" font-weight="bold">3</text>
  <rect x="162" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="189" y="95" font-size="26" fill="#6b6b6b">4</text><line x1="170" y1="85" x2="208" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="222" y="50" width="54" height="70" rx="10" fill="#2e7d32"/><text x="249" y="95" font-size="26" fill="#ffffff" font-weight="bold">5</text>
  <rect x="282" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="309" y="95" font-size="26" fill="#6b6b6b">6</text><line x1="290" y1="85" x2="328" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="342" y="50" width="54" height="70" rx="10" fill="#2e7d32"/><text x="369" y="95" font-size="26" fill="#ffffff" font-weight="bold">7</text>
  <rect x="402" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="429" y="95" font-size="26" fill="#6b6b6b">8</text><line x1="410" y1="85" x2="448" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="462" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="489" y="95" font-size="26" fill="#6b6b6b">9</text><line x1="470" y1="85" x2="508" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="522" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="549" y="95" font-size="24" fill="#6b6b6b">10</text><line x1="530" y1="85" x2="568" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="582" y="50" width="54" height="70" rx="10" fill="#2e7d32"/><text x="609" y="95" font-size="24" fill="#ffffff" font-weight="bold">11</text>
  <rect x="642" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="669" y="95" font-size="24" fill="#6b6b6b">12</text><line x1="650" y1="85" x2="688" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="702" y="50" width="54" height="70" rx="10" fill="#2e7d32"/><text x="729" y="95" font-size="24" fill="#ffffff" font-weight="bold">13</text>
  <rect x="762" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="789" y="95" font-size="24" fill="#6b6b6b">14</text><line x1="770" y1="85" x2="808" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="822" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="849" y="95" font-size="24" fill="#6b6b6b">15</text><line x1="830" y1="85" x2="868" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="882" y="50" width="54" height="70" rx="10" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/><text x="909" y="95" font-size="24" fill="#6b6b6b">16</text><line x1="890" y1="85" x2="928" y2="85" stroke="#c62828" stroke-width="4"/>
  <rect x="300" y="152" width="24" height="24" rx="6" fill="#2e7d32"/><text x="384" y="171" font-size="18" fill="#2e7d32" font-weight="bold">primo</text>
  <line x1="520" y1="164" x2="558" y2="164" stroke="#c62828" stroke-width="4"/><text x="668" y="171" font-size="18" fill="#c62828" font-weight="bold">múltiplo tachado</text>
</svg>

- El bucle interno solo corre para primos $p$, tachando $n/p$ números.
- Suma sobre primos: $\displaystyle\sum_{p \le n} \frac{n}{p} = O(n\log\log n)$.
- **$O(n\log\log n)$**, casi lineal.

---

# De la complejidad al tiempo

Con la complejidad $O(f(n))$ estimamos cuánto **demora** el programa.

Regla de dedo en competitiva: una máquina hace ≈ $10^8$ operaciones por segundo.

<svg viewBox="0 0 960 200" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="60" y="54" width="250" height="100" rx="12" fill="#15214c"/>
<text x="185" y="100" font-size="24" fill="#ffffff" font-weight="bold">Complejidad</text>
<text x="185" y="132" font-size="18" fill="#b9c4de">O(f(n))</text>
<path d="M316 104 L350 104 M350 104 L341 98 M350 104 L341 110" stroke="#9aa4b2" stroke-width="4" fill="none" stroke-linecap="round"/>
<rect x="360" y="54" width="250" height="100" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="485" y="100" font-size="24" fill="#15214c" font-weight="bold">Máquina</text>
<text x="485" y="132" font-size="18" fill="#e27d00" font-weight="bold">≈ 10⁸ ops/seg</text>
<path d="M616 104 L650 104 M650 104 L641 98 M650 104 L641 110" stroke="#9aa4b2" stroke-width="4" fill="none" stroke-linecap="round"/>
<rect x="660" y="54" width="250" height="100" rx="12" fill="#15214c"/>
<text x="785" y="100" font-size="24" fill="#ffffff" font-weight="bold">Tiempo (s)</text>
<text x="785" y="132" font-size="18" fill="#b9c4de">≈ f(n) / 10⁸</text>
</svg>

$$\text{tiempo (s)} \approx \frac{f(n)}{10^8}$$

---

# Dos ejemplos

<svg viewBox="0 0 960 320" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="380" y="12" width="200" height="42" rx="21" fill="#e27d00"/>
<text x="480" y="40" font-size="20" fill="#ffffff" font-weight="bold">mismo n = 10⁶</text>
<rect x="30" y="74" width="430" height="228" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<text x="245" y="125" font-size="26" fill="#15214c" font-weight="bold">f(n) = n²</text>
<text x="245" y="170" font-size="21" fill="#6b6b6b">= 10¹² operaciones</text>
<text x="245" y="205" font-size="20" fill="#6b6b6b">≈ 10⁴ s  (≈ 2.8 horas)</text>
<rect x="145" y="240" width="200" height="46" rx="23" fill="#c62828"/>
<text x="245" y="269" font-size="20" fill="#ffffff" font-weight="bold">TLE seguro</text>
<rect x="500" y="74" width="430" height="228" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<text x="715" y="125" font-size="25" fill="#15214c" font-weight="bold">f(n) = n · log₂ n</text>
<text x="715" y="170" font-size="21" fill="#6b6b6b">≈ 2 · 10⁷ operaciones</text>
<text x="715" y="205" font-size="20" fill="#6b6b6b">≈ 0.2 s</text>
<rect x="615" y="240" width="200" height="46" rx="23" fill="#2e7d32"/>
<text x="715" y="269" font-size="20" fill="#ffffff" font-weight="bold">cómodo</text>
</svg>

**Moraleja:** el mismo $n$ pasa o no según la complejidad.

<small>Recuerda: $\log_2(10^6)\approx 20$, por eso $n\log_2 n \approx 10^6\cdot 20 = 2\times 10^7$.</small>

---

# ¿Qué complejidad me pide el límite de $n$?

Guía rápida: el mayor $n$ que aguanta cada complejidad en ~1 segundo.

<svg viewBox="0 0 960 348" xmlns="http://www.w3.org/2000/svg" style="width:80%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="180" y="68" width="600" height="44" fill="#eef1f7"/>
<rect x="180" y="112" width="600" height="44" fill="#f7f8fa"/>
<rect x="180" y="156" width="600" height="44" fill="#eef1f7"/>
<rect x="180" y="200" width="600" height="44" fill="#f7f8fa"/>
<rect x="180" y="244" width="600" height="44" fill="#eef1f7"/>
<rect x="180" y="288" width="600" height="44" fill="#f7f8fa"/>
<rect x="180" y="16" width="600" height="52" rx="12" fill="#15214c"/>
<text x="330" y="48" font-size="20" fill="#ffffff" font-weight="bold">Tamaño de n</text>
<text x="630" y="48" font-size="20" fill="#ffffff" font-weight="bold">Complejidad (≈ 1 s)</text>
<path d="M480 68 L480 332" stroke="#c9c9c9" stroke-width="2"/>
<text x="330" y="96" font-size="22" fill="#15214c" font-weight="bold">n ≤ 11</text>
<text x="330" y="140" font-size="22" fill="#15214c" font-weight="bold">n ≤ 25</text>
<text x="330" y="184" font-size="22" fill="#15214c" font-weight="bold">n ≤ 500</text>
<text x="330" y="228" font-size="22" fill="#15214c" font-weight="bold">n ≤ 5 000</text>
<text x="330" y="272" font-size="22" fill="#15214c" font-weight="bold">n ≤ 10⁶</text>
<text x="330" y="316" font-size="22" fill="#15214c" font-weight="bold">n ≤ 10⁸</text>
<rect x="555" y="70" width="150" height="40" rx="20" fill="#c62828"/>
<text x="630" y="97" font-size="19" fill="#ffffff" font-weight="bold">O(n!)</text>
<rect x="555" y="114" width="150" height="40" rx="20" fill="#c62828"/>
<text x="630" y="141" font-size="19" fill="#ffffff" font-weight="bold">O(2ⁿ)</text>
<rect x="555" y="158" width="150" height="40" rx="20" fill="#e27d00"/>
<text x="630" y="185" font-size="19" fill="#ffffff" font-weight="bold">O(n³)</text>
<rect x="555" y="202" width="150" height="40" rx="20" fill="#e27d00"/>
<text x="630" y="229" font-size="19" fill="#ffffff" font-weight="bold">O(n²)</text>
<rect x="555" y="246" width="150" height="40" rx="20" fill="#2e7d32"/>
<text x="630" y="273" font-size="19" fill="#ffffff" font-weight="bold">O(n log n)</text>
<rect x="555" y="290" width="150" height="40" rx="20" fill="#2e7d32"/>
<text x="630" y="317" font-size="19" fill="#ffffff" font-weight="bold">O(n)</text>
<rect x="180" y="16" width="600" height="316" rx="12" fill="none" stroke="#c9c9c9" stroke-width="2"/>
</svg>

<small>Es una guía aproximada: la constante oculta y la constante del lenguaje pueden mover el límite.</small>

---

<!-- _class: title -->

# Estructuras de datos básicas

Pilas, colas, deque y colas de prioridad

---

# ¿Por qué son importantes?

- Permiten resolver problemas de forma **rápida y eficiente**.
- Ayudan a **organizar y manejar** la información con operaciones ya optimizadas.
- Vienen **listas en la STL** de C++.

<svg viewBox="0 0 960 210" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="20" y="30" width="290" height="150" rx="12" fill="#15214c"/>
<text x="165" y="86" font-size="21" fill="#ffffff" font-weight="bold">Rápidas y eficientes</text>
<text x="165" y="120" font-size="17" fill="#b9c4de">resuelven</text>
<text x="165" y="146" font-size="17" fill="#b9c4de">problemas</text>
<rect x="335" y="30" width="290" height="150" rx="12" fill="#15214c"/>
<text x="480" y="86" font-size="21" fill="#ffffff" font-weight="bold">Organizan datos</text>
<text x="480" y="120" font-size="17" fill="#b9c4de">operaciones ya</text>
<text x="480" y="146" font-size="17" fill="#b9c4de">optimizadas</text>
<rect x="650" y="30" width="290" height="150" rx="12" fill="#15214c"/>
<text x="795" y="86" font-size="21" fill="#e27d00" font-weight="bold">Ya en la STL</text>
<text x="795" y="120" font-size="17" fill="#b9c4de">vienen listas</text>
<text x="795" y="146" font-size="17" fill="#b9c4de">en C++</text>
</svg>

---

# Pila (stack)

- **LIFO**: el último en entrar es el primero en salir.
- `push` agrega arriba · `pop` quita arriba · `top` mira el tope · `empty`.

<svg viewBox="0 0 960 260" xmlns="http://www.w3.org/2000/svg" style="width:70%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="430" y="52" font-size="17" fill="#2e7d32" font-weight="bold">push</text>
<path d="M430 60 L430 80 M430 80 L424 71 M430 80 L436 71" stroke="#2e7d32" stroke-width="4" fill="none"/>
<text x="530" y="52" font-size="17" fill="#e27d00" font-weight="bold">pop</text>
<path d="M530 80 L530 60 M530 60 L524 69 M530 60 L536 69" stroke="#e27d00" stroke-width="4" fill="none"/>
<rect x="395" y="84" width="170" height="44" rx="10" fill="#15214c" stroke="#e27d00" stroke-width="5"/>
<text x="480" y="115" font-size="24" fill="#ffffff" font-weight="bold">10</text>
<rect x="395" y="130" width="170" height="44" rx="10" fill="#15214c"/>
<text x="480" y="161" font-size="24" fill="#ffffff" font-weight="bold">5</text>
<rect x="395" y="176" width="170" height="44" rx="10" fill="#15214c"/>
<text x="480" y="207" font-size="24" fill="#ffffff" font-weight="bold">7</text>
<text x="655" y="112" font-size="18" fill="#e27d00" font-weight="bold">tope</text>
<path d="M615 106 L572 106 M572 106 L582 100 M572 106 L582 112" stroke="#e27d00" stroke-width="4" fill="none"/>
<text x="650" y="204" font-size="17" fill="#8a94a6">base</text>
<path d="M615 198 L572 198 M572 198 L582 192 M572 198 L582 204" stroke="#8a94a6" stroke-width="4" fill="none"/>
<text x="205" y="106" font-size="15" fill="#6b6b6b">entra y sale</text>
<text x="205" y="128" font-size="15" fill="#6b6b6b">por arriba</text>
<text x="480" y="248" font-size="17" fill="#6b6b6b">LIFO · el último en entrar sale primero</text>
</svg>

```cpp
stack<int> pila;
pila.push(7);
pila.push(5);
pila.push(10);
cout << pila.top() << endl; // 10
pila.pop();
cout << pila.top() << endl; // 5
```

---

# Cola (queue)

- **FIFO**: el primero en entrar es el primero en salir.
- `push` atrás · `pop` adelante · `front` · `back` · `empty`.

<svg viewBox="0 0 960 235" xmlns="http://www.w3.org/2000/svg" style="width:88%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="140" y="88" font-size="16" fill="#e27d00" font-weight="bold">front · sale</text>
<path d="M239 106 L188 106 M188 106 L198 100 M188 106 L198 112" stroke="#e27d00" stroke-width="4" fill="none"/>
<text x="820" y="88" font-size="16" fill="#2e7d32" font-weight="bold">back · entra</text>
<path d="M772 106 L714 106 M714 106 L724 100 M714 106 L724 112" stroke="#2e7d32" stroke-width="4" fill="none"/>
<rect x="249" y="64" width="108" height="84" rx="10" fill="#15214c" stroke="#e27d00" stroke-width="5"/>
<text x="303" y="118" font-size="32" fill="#ffffff" font-weight="bold">1</text>
<rect x="367" y="64" width="108" height="84" rx="10" fill="#15214c"/>
<text x="421" y="118" font-size="32" fill="#ffffff" font-weight="bold">2</text>
<rect x="485" y="64" width="108" height="84" rx="10" fill="#15214c"/>
<text x="539" y="118" font-size="32" fill="#ffffff" font-weight="bold">3</text>
<rect x="603" y="64" width="108" height="84" rx="10" fill="#15214c" stroke="#2e7d32" stroke-width="5"/>
<text x="657" y="118" font-size="32" fill="#ffffff" font-weight="bold">4</text>
<text x="303" y="182" font-size="17" fill="#e27d00" font-weight="bold">front</text>
<text x="657" y="182" font-size="17" fill="#2e7d32" font-weight="bold">back</text>
<text x="480" y="216" font-size="17" fill="#6b6b6b">FIFO · el primero en entrar sale primero</text>
</svg>

```cpp
queue<int> cola;
cola.push(1);
cola.push(2);
cout << cola.front() << endl; // 1
cola.pop();
cout << cola.front() << endl; // 2
```

---

# Doble cola (deque)

- Inserta y elimina por **ambos extremos** en $O(1)$; combina pila y cola.
- Además permite acceso por índice: `dq[i]`.
- `push_back` · `push_front` · `pop_back` · `pop_front`.

<svg viewBox="0 0 960 270" xmlns="http://www.w3.org/2000/svg" style="width:90%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="175" y="110" font-size="16" fill="#2e7d32" font-weight="bold">push_front</text>
<path d="M245 128 L302 128 M302 128 L292 122 M302 128 L292 134" stroke="#2e7d32" stroke-width="4" fill="none"/>
<text x="175" y="200" font-size="16" fill="#e27d00" font-weight="bold">pop_front</text>
<path d="M302 160 L245 160 M245 160 L255 154 M245 160 L255 166" stroke="#e27d00" stroke-width="4" fill="none"/>
<text x="785" y="110" font-size="16" fill="#2e7d32" font-weight="bold">push_back</text>
<path d="M715 128 L658 128 M658 128 L668 122 M658 128 L668 134" stroke="#2e7d32" stroke-width="4" fill="none"/>
<text x="785" y="200" font-size="16" fill="#e27d00" font-weight="bold">pop_back</text>
<path d="M658 160 L715 160 M715 160 L705 154 M715 160 L705 166" stroke="#e27d00" stroke-width="4" fill="none"/>
<rect x="308" y="95" width="108" height="84" rx="10" fill="#15214c" stroke="#e27d00" stroke-width="5"/>
<text x="362" y="148" font-size="30" fill="#ffffff" font-weight="bold">2</text>
<rect x="426" y="95" width="108" height="84" rx="10" fill="#15214c"/>
<text x="480" y="148" font-size="30" fill="#ffffff" font-weight="bold">7</text>
<rect x="544" y="95" width="108" height="84" rx="10" fill="#15214c" stroke="#2e7d32" stroke-width="5"/>
<text x="598" y="148" font-size="30" fill="#ffffff" font-weight="bold">1</text>
<text x="362" y="210" font-size="17" fill="#e27d00" font-weight="bold">front</text>
<text x="598" y="210" font-size="17" fill="#2e7d32" font-weight="bold">back</text>
<text x="480" y="250" font-size="17" fill="#6b6b6b">ambos extremos en O(1) · combina pila y cola</text>
</svg>

```cpp
deque<int> dq;
dq.push_back(1);
dq.push_front(2);
cout << dq.front() << endl; // 2
cout << dq.back() << endl;  // 1
```

---

# Cola de prioridad (priority_queue)

Como una cola, pero **no respeta el orden de llegada**: siempre entrega el **mayor** (o el menor, si la configuras así).

Operaciones **push**, **pop**, **top**, **empty**, cada una en $O(\log n)$.

<svg viewBox="0 0 960 280" xmlns="http://www.w3.org/2000/svg" style="width:50%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="240" y="52" font-size="20" fill="#15214c" font-weight="bold">Bolsa desordenada</text>
<rect x="70" y="70" width="340" height="180" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<circle cx="150" cy="140" r="26" fill="#15214c"/>
<text x="150" y="148" font-size="22" fill="#ffffff" font-weight="bold">3</text>
<circle cx="250" cy="130" r="26" fill="#e27d00"/>
<text x="250" y="138" font-size="22" fill="#ffffff" font-weight="bold">8</text>
<circle cx="340" cy="160" r="26" fill="#15214c"/>
<text x="340" y="168" font-size="22" fill="#ffffff" font-weight="bold">1</text>
<circle cx="180" cy="210" r="26" fill="#15214c"/>
<text x="180" y="218" font-size="22" fill="#ffffff" font-weight="bold">5</text>
<circle cx="300" cy="205" r="26" fill="#15214c"/>
<text x="300" y="213" font-size="22" fill="#ffffff" font-weight="bold">2</text>
<text x="462" y="148" font-size="16" fill="#6b6b6b">top()</text>
<path d="M418 160 L500 160 M500 160 L490 153 M500 160 L490 167" stroke="#9aa4b2" stroke-width="3" fill="none"/>
<text x="575" y="112" font-size="16" fill="#6b6b6b">el máximo</text>
<rect x="515" y="128" width="120" height="64" rx="23" fill="#e27d00"/>
<text x="575" y="170" font-size="32" fill="#ffffff" font-weight="bold">8</text>
<rect x="680" y="90" width="210" height="54" rx="12" fill="#15214c"/>
<text x="785" y="123" font-size="19" fill="#ffffff">push · agrega</text>
<rect x="680" y="160" width="210" height="54" rx="12" fill="#15214c"/>
<text x="785" y="193" font-size="18" fill="#ffffff">pop · saca el máximo</text>
</svg>

```cpp
priority_queue<int> pq;              // máximo arriba (por defecto)
pq.push(3); pq.push(8); pq.push(1);
cout << pq.top() << endl; // 8
pq.pop();
cout << pq.top() << endl; // 3
priority_queue<int, vector<int>, greater<int>> pqmin; // mínimo arriba
```

---

# Ejercicio: paréntesis balanceados

Te dan una cadena con solo `(` y `)`.

Determina si están **correctamente balanceados**.

Cada `(` debe cerrarse con un `)` posterior, en el orden correcto.

<svg viewBox="0 0 960 200" xmlns="http://www.w3.org/2000/svg" style="width:94%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="185" y="52" font-size="16" fill="#6b6b6b">entrada</text>
<rect x="60" y="70" width="250" height="64" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="185" y="112" font-size="26" fill="#15214c" font-weight="bold">( ( ) ( ) )</text>
<path d="M320 102 L378 102 M378 102 L368 95 M378 102 L368 109" stroke="#9aa4b2" stroke-width="3" fill="none"/>
<rect x="385" y="64" width="230" height="76" rx="12" fill="#15214c"/>
<text x="500" y="110" font-size="22" fill="#ffffff">¿balanceados?</text>
<path d="M620 100 L688 78 M688 78 L676 78 M688 78 L681 88" stroke="#9aa4b2" stroke-width="3" fill="none"/>
<path d="M620 100 L688 140 M688 140 L676 140 M688 140 L681 130" stroke="#9aa4b2" stroke-width="3" fill="none"/>
<rect x="700" y="58" width="120" height="46" rx="23" fill="#2e7d32"/>
<text x="760" y="88" font-size="20" fill="#ffffff" font-weight="bold">YES</text>
<rect x="700" y="118" width="120" height="46" rx="23" fill="#c62828"/>
<text x="760" y="148" font-size="20" fill="#ffffff" font-weight="bold">NO</text>
</svg>

<div class="table-horizontal">

| cadena | ¿balanceada? |
|--------|--------------|
| `(()())` | YES |
| `)()(` | NO |
| `((()))` | YES |
| `(()` | NO |

</div>

**¿Qué estructura te conviene? Piénsalo…**

---

# Paréntesis: la idea

Recorremos la cadena con una **pila**: cada `(` hace **push**, cada `)` hace **pop**.

Un `)` con la pila **vacía** → **NO**. Si al final quedan `(` sin cerrar → **NO**. Si no → **YES**.

<svg viewBox="0 0 960 320" xmlns="http://www.w3.org/2000/svg" style="width:74%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="130" y="46" font-size="26" fill="#15214c" font-weight="bold">(</text>
<text x="265" y="46" font-size="26" fill="#15214c" font-weight="bold">(</text>
<text x="400" y="46" font-size="26" fill="#15214c" font-weight="bold">)</text>
<text x="535" y="46" font-size="26" fill="#15214c" font-weight="bold">(</text>
<text x="670" y="46" font-size="26" fill="#15214c" font-weight="bold">)</text>
<text x="805" y="46" font-size="26" fill="#15214c" font-weight="bold">)</text>
<rect x="88" y="210" width="84" height="36" rx="6" fill="#15214c"/>
<text x="130" y="235" font-size="22" fill="#ffffff">(</text>
<rect x="223" y="210" width="84" height="36" rx="6" fill="#15214c"/>
<text x="265" y="235" font-size="22" fill="#ffffff">(</text>
<rect x="223" y="170" width="84" height="36" rx="6" fill="#15214c"/>
<text x="265" y="195" font-size="22" fill="#ffffff">(</text>
<rect x="358" y="210" width="84" height="36" rx="6" fill="#15214c"/>
<text x="400" y="235" font-size="22" fill="#ffffff">(</text>
<rect x="493" y="210" width="84" height="36" rx="6" fill="#15214c"/>
<text x="535" y="235" font-size="22" fill="#ffffff">(</text>
<rect x="493" y="170" width="84" height="36" rx="6" fill="#15214c"/>
<text x="535" y="195" font-size="22" fill="#ffffff">(</text>
<rect x="628" y="210" width="84" height="36" rx="6" fill="#15214c"/>
<text x="670" y="235" font-size="22" fill="#ffffff">(</text>
<path d="M70 250 L890 250" stroke="#9aa4b2" stroke-width="2" fill="none"/>
<text x="130" y="280" font-size="17" fill="#2e7d32">push</text>
<text x="265" y="280" font-size="17" fill="#2e7d32">push</text>
<text x="400" y="280" font-size="17" fill="#c62828">pop</text>
<text x="535" y="280" font-size="17" fill="#2e7d32">push</text>
<text x="670" y="280" font-size="17" fill="#c62828">pop</text>
<text x="805" y="280" font-size="17" fill="#c62828">pop</text>
<text x="130" y="304" font-size="16" fill="#6b6b6b">tam 1</text>
<text x="265" y="304" font-size="16" fill="#6b6b6b">tam 2</text>
<text x="400" y="304" font-size="16" fill="#6b6b6b">tam 1</text>
<text x="535" y="304" font-size="16" fill="#6b6b6b">tam 2</text>
<text x="670" y="304" font-size="16" fill="#6b6b6b">tam 1</text>
<text x="805" y="304" font-size="16" fill="#2e7d32" font-weight="bold">tam 0 ✓</text>
</svg>

Termina **vacía** → la cadena está balanceada → **YES**.

---

# Paréntesis: código

```cpp
string s; cin >> s;
stack<char> st;
bool ok = true;
for (char c : s) {
    if (c == '(') st.push(c);
    else {
        if (st.empty()) { ok = false; break; }
        st.pop();
    }
}
if (!st.empty()) ok = false;
cout << (ok ? "YES" : "NO") << endl;
```

`st.empty()` al ver un `)` → sobra un cierre → **NO**.

`!st.empty()` al final → quedaron `(` sin cerrar → **NO**.

En cualquier otro caso → **YES**.

---

# Conjunto (set)

Colección **ordenada** y **sin repetidos**.

- Todo en $O(\log n)$: `insert`, `erase`, `count` (0/1), `find`.
- `lower_bound(x)`: primer elemento $\ge x$.
- `upper_bound(x)`: primer elemento $> x$.
- ¿Quieres permitir repetidos? Usa **multiset**.

<svg viewBox="0 0 960 250" xmlns="http://www.w3.org/2000/svg" style="width:58%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="480" y="34" font-size="18" fill="#e27d00" font-weight="bold">Ordenado de menor a mayor · sin repetidos</text>
<circle cx="200" cy="150" r="44" fill="#15214c"/>
<text x="200" y="162" font-size="34" fill="#ffffff" font-weight="bold">2</text>
<circle cx="380" cy="150" r="44" fill="#15214c"/>
<text x="380" y="162" font-size="34" fill="#ffffff" font-weight="bold">4</text>
<circle cx="560" cy="150" r="44" fill="#15214c"/>
<text x="560" y="162" font-size="34" fill="#ffffff" font-weight="bold">6</text>
<circle cx="740" cy="150" r="44" fill="#15214c"/>
<text x="740" y="162" font-size="34" fill="#ffffff" font-weight="bold">8</text>
<circle cx="380" cy="64" r="30" fill="#f7f8fa" stroke="#c62828" stroke-width="3"/>
<text x="380" y="74" font-size="26" fill="#c62828" font-weight="bold">4</text>
<line x1="359" y1="85" x2="401" y2="43" stroke="#c62828" stroke-width="3"/>
<text x="640" y="70" font-size="18" fill="#c62828" font-weight="bold">insert(4) otra vez → se ignora</text>
<path d="M150 214 L790 214 M790 214 L778 208 M790 214 L778 220" stroke="#8a94a6" stroke-width="3" fill="none"/>
<text x="470" y="238" font-size="15" fill="#8a94a6">menor → mayor</text>
</svg>

```cpp
set<int> s;
s.insert(4); s.insert(2); s.insert(4); // el 4 no se repite
if (s.count(2)) cout << "esta el 2" << endl;
s.erase(2);
if (!s.count(2)) cout << "el 2 ya no esta" << endl;
```

---

# Diccionario (map)

Asocia **clave → valor**, con las **claves ordenadas**.

- `insert`, `erase`, `find`, `lower_bound`/`upper_bound` por clave, en $O(\log n)$.
- Operador `[]`: accede y **crea la clave si no existe**.
- Uso típico: **contar frecuencias**, asociar datos a una clave.

<svg viewBox="0 0 960 250" xmlns="http://www.w3.org/2000/svg" style="width:56%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="310" y="40" font-size="19" fill="#15214c" font-weight="bold">clave</text>
<text x="660" y="40" font-size="19" fill="#15214c" font-weight="bold">valor</text>
<rect x="180" y="62" width="260" height="64" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="310" y="102" font-size="24" fill="#15214c" font-weight="bold">"gato"</text>
<rect x="590" y="62" width="140" height="64" rx="12" fill="#15214c"/>
<text x="660" y="104" font-size="30" fill="#ffffff" font-weight="bold">3</text>
<path d="M446 94 L582 94 M582 94 L570 88 M582 94 L570 100" stroke="#e27d00" stroke-width="4" fill="none"/>
<rect x="180" y="152" width="260" height="64" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="310" y="192" font-size="24" fill="#15214c" font-weight="bold">"perro"</text>
<rect x="590" y="152" width="140" height="64" rx="12" fill="#15214c"/>
<text x="660" y="194" font-size="30" fill="#ffffff" font-weight="bold">5</text>
<path d="M446 184 L582 184 M582 184 L570 178 M582 184 L570 190" stroke="#e27d00" stroke-width="4" fill="none"/>
</svg>

```cpp
map<string,int> mp;
mp["gato"] = 3;
mp["perro"] = 5;
cout << mp["gato"] << endl; // 3
mp.erase("gato");
if (!mp.count("gato")) cout << "gato ya no esta" << endl;
```

---

# Iteradores

Un iterador es como un **puntero** a un elemento del contenedor.

- Avanzar `++it`, retroceder `--it`, leer `*it`.
- `find` devuelve un iterador al elemento, o `end()` si no está.
- Se compara con `s.end()` para saber si el elemento existe.

<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" style="width:88%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<text x="340" y="28" font-size="17" fill="#e27d00" font-weight="bold">++it</text>
<path d="M270 66 C300 26 380 26 410 62 M410 62 L399 62 M410 62 L406 51" stroke="#e27d00" stroke-width="3" fill="none"/>
<rect x="210" y="70" width="120" height="80" rx="10" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="270" y="126" font-size="34" fill="#15214c" font-weight="bold">2</text>
<rect x="350" y="70" width="120" height="80" rx="10" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="410" y="126" font-size="34" fill="#15214c" font-weight="bold">4</text>
<rect x="490" y="70" width="120" height="80" rx="10" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="550" y="126" font-size="34" fill="#15214c" font-weight="bold">6</text>
<rect x="630" y="70" width="120" height="80" rx="10" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="690" y="126" font-size="34" fill="#15214c" font-weight="bold">8</text>
<path d="M270 190 L270 156 M270 156 L264 167 M270 156 L276 167" stroke="#e27d00" stroke-width="4" fill="none"/>
<rect x="235" y="192" width="70" height="40" rx="20" fill="#e27d00"/>
<text x="270" y="219" font-size="19" fill="#ffffff" font-weight="bold">it</text>
<text x="560" y="219" font-size="17" fill="#6b6b6b">*it lee el valor apuntado</text>
</svg>

---

# Iteradores: ejemplos

Recorrer un **set** con un iterador:

```cpp
set<int> s = {2, 4, 6};
auto it = s.begin();   // apunta al 2
cout << *it << endl;   // 2
++it;                  // ahora al 4
cout << *it << endl;   // 4
```

Recorrer un **map** completo (`it->first` clave, `it->second` valor):

```cpp
map<string,int> m = {{"a",1}, {"b",2}};
for (auto it = m.begin(); it != m.end(); ++it)
    cout << it->first << " -> " << it->second << endl;
```

---

# Ejercicio: ¿pasan todos los niveles?

Un juego tiene $n$ niveles. **Dos jugadores** pueden pasar ciertos niveles.

Colaborando, ¿logran pasar **todos** los niveles del $1$ al $n$?

- Entrada: $n$; luego los niveles del **jugador 1** y los del **jugador 2**.
- Salida: `I become the guy.` si cubren todos, o `Oh, my keyboard!` si falta alguno.

<div class="table-horizontal">

| $n$ | Jugador 1 | Jugador 2 | Salida |
|---|---|---|---|
| 4 | 1 2 3 | 2 4 | I become the guy. |
| 4 | 1 2 3 | 2 3 | Oh, my keyboard! |

</div>

<svg viewBox="0 0 960 250" xmlns="http://www.w3.org/2000/svg" style="width:86%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="276" y="40" width="90" height="60" rx="10" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="321" y="82" font-size="30" fill="#15214c" font-weight="bold">1</text>
<rect x="382" y="40" width="90" height="60" rx="10" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="427" y="82" font-size="30" fill="#15214c" font-weight="bold">2</text>
<rect x="488" y="40" width="90" height="60" rx="10" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="533" y="82" font-size="30" fill="#15214c" font-weight="bold">3</text>
<rect x="594" y="40" width="90" height="60" rx="10" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="639" y="82" font-size="30" fill="#15214c" font-weight="bold">4</text>
<text x="480" y="128" font-size="16" fill="#6b6b6b">niveles 1..n a cubrir</text>
<rect x="70" y="150" width="360" height="60" rx="12" fill="#15214c"/>
<text x="250" y="188" font-size="20" fill="#ffffff" font-weight="bold">jugador 1 pasa: 1 2 3</text>
<rect x="530" y="150" width="360" height="60" rx="12" fill="#15214c"/>
<text x="710" y="188" font-size="20" fill="#ffffff" font-weight="bold">jugador 2 pasa: 2 4</text>
<text x="480" y="240" font-size="18" fill="#e27d00" font-weight="bold">¿Juntos cubren 1, 2, 3, 4?</text>
</svg>

---

# Niveles: solución

Metemos **todos** los niveles que alguien puede pasar en un **set** (así no contamos repetidos).

Si el tamaño del set es $n$, entonces **están todos**.

<svg viewBox="0 0 960 300" xmlns="http://www.w3.org/2000/svg" style="width:54%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="40" y="54" width="250" height="72" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="165" y="98" font-size="20" fill="#15214c" font-weight="bold">jugador 1: 1 2 3</text>
<rect x="40" y="174" width="250" height="72" rx="12" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/>
<text x="165" y="218" font-size="20" fill="#15214c" font-weight="bold">jugador 2: 2 4</text>
<path d="M296 96 L384 132 M384 132 L371 130 M384 132 L378 120" stroke="#e27d00" stroke-width="4" fill="none"/>
<path d="M296 204 L384 168 M384 168 L371 170 M384 168 L378 180" stroke="#e27d00" stroke-width="4" fill="none"/>
<rect x="390" y="90" width="230" height="120" rx="12" fill="#15214c"/>
<text x="505" y="134" font-size="22" fill="#ffffff" font-weight="bold">set niveles</text>
<text x="505" y="176" font-size="24" fill="#ffffff">{ 1, 2, 3, 4 }</text>
<path d="M626 150 L684 150 M684 150 L672 145 M684 150 L672 155" stroke="#e27d00" stroke-width="4" fill="none"/>
<rect x="690" y="105" width="240" height="90" rx="12" fill="#f7f8fa" stroke="#2e7d32" stroke-width="3"/>
<text x="810" y="145" font-size="22" fill="#15214c" font-weight="bold">tamaño = 4</text>
<text x="810" y="177" font-size="20" fill="#2e7d32" font-weight="bold">= n → todos</text>
<text x="480" y="278" font-size="17" fill="#6b6b6b">tamaño del set = n significa que no falta ningún nivel</text>
</svg>

```cpp
int n; cin >> n;
set<int> niveles;
int p; cin >> p;
for (int i = 0; i < p; i++) { int x; cin >> x; niveles.insert(x); }
int q; cin >> q;
for (int i = 0; i < q; i++) { int x; cin >> x; niveles.insert(x); }
if ((int)niveles.size() == n) cout << "I become the guy." << endl;
else cout << "Oh, my keyboard!" << endl;
```

---

# Resumen de complejidades

<div class="table-horizontal">

| Estructura | Inserción | Borrado | Búsqueda | Acceso al extremo |
|---|:---:|:---:|:---:|:---:|
| **stack** · **queue** · **deque** | $O(1)$ | $O(1)$ | — | $O(1)$ |
| **priority_queue** | $O(\log n)$ | $O(\log n)$ | — | $O(1)$ |
| **set** · **map** | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |

</div>

<svg viewBox="0 0 960 74" xmlns="http://www.w3.org/2000/svg" style="width:82%;display:block;margin:1.4em auto 0;font-family:'DejaVu Sans',Arial,sans-serif" text-anchor="middle"><rect x="120" y="14" width="330" height="46" rx="23" fill="#eef1f7" stroke="#c9c9c9" stroke-width="2"/><text x="285" y="43" font-size="16" fill="#15214c">extremos · <tspan font-weight="bold">O(1)</tspan></text><rect x="510" y="14" width="330" height="46" rx="23" fill="#e27d00"/><text x="675" y="43" font-size="16" fill="#ffffff">ordenados por clave · <tspan font-weight="bold">O(log n)</tspan></text></svg>

Los que solo tocan un **extremo** son los más rápidos.
Los **ordenados por clave** pagan un $\log n$ a cambio de mantener el orden.

---

# Consejos para competir

<svg viewBox="0 0 960 240" xmlns="http://www.w3.org/2000/svg" style="width:62%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<rect x="30" y="24" width="430" height="190" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<text x="245" y="58" font-size="21" fill="#c62828" font-weight="bold">sin revisar</text>
<rect x="70" y="78" width="150" height="66" rx="8" fill="none" stroke="#15214c" stroke-width="2" stroke-dasharray="7 6"/>
<text x="145" y="118" font-size="18" fill="#8a94a6">vacía</text>
<path d="M228 111 L296 111 M296 111 L284 103 M296 111 L284 119" stroke="#c62828" stroke-width="4" fill="none"/>
<text x="360" y="106" font-size="18" fill="#15214c">e.top()</text>
<text x="245" y="192" font-size="17" fill="#c62828" font-weight="bold">comportamiento indefinido</text>
<rect x="500" y="24" width="430" height="190" rx="12" fill="#f7f8fa" stroke="#c9c9c9" stroke-width="2"/>
<text x="715" y="58" font-size="21" fill="#2e7d32" font-weight="bold">con guardia</text>
<rect x="536" y="82" width="230" height="46" rx="23" fill="#15214c"/>
<text x="651" y="111" font-size="18" fill="#ffffff">if ( !e.empty() )</text>
<path d="M775 105 L843 105 M843 105 L831 97 M843 105 L831 113" stroke="#2e7d32" stroke-width="4" fill="none"/>
<text x="893" y="106" font-size="18" fill="#15214c">top()</text>
<text x="715" y="192" font-size="17" fill="#2e7d32" font-weight="bold">acceso seguro</text>
</svg>

- Antes de `top()`, `front()` o `pop()`: revisa `!e.empty()`. Tocar una estructura **vacía** es comportamiento indefinido.
- `unordered_map` y `unordered_set` dan $O(1)$ **en promedio**, pero $O(n)$ en el peor caso por colisiones. Útiles con entradas **no adversarias**.
- Con `pair`, `tuple` o `struct` como clave en un contenedor *unordered*, define un **hash propio**.
- `find` y `lower_bound` rinden más cuando cada elemento **guarda más de un dato**, por ejemplo un `pair<int,int>`.

---

# Ejercicio final: Palindrome Reorder

<svg viewBox="0 0 960 250" xmlns="http://www.w3.org/2000/svg" style="width:88%;display:block;margin:0 auto" font-family="'DejaVu Sans',Arial,sans-serif" text-anchor="middle">
<path d="M246 110 Q 480 8 714 110" stroke="#e27d00" stroke-width="3" fill="none"/>
<path d="M324 110 Q 480 44 636 110" stroke="#e27d00" stroke-width="3" fill="none"/>
<path d="M402 110 Q 480 76 558 110" stroke="#e27d00" stroke-width="3" fill="none"/>
<line x1="480" y1="104" x2="480" y2="196" stroke="#8a94a6" stroke-width="2.5" stroke-dasharray="8 6"/>
<rect x="211" y="110" width="70" height="70" rx="8" fill="#15214c"/><text x="246" y="156" font-size="26" fill="#ffffff" font-weight="bold">R</text>
<rect x="289" y="110" width="70" height="70" rx="8" fill="#15214c"/><text x="324" y="156" font-size="26" fill="#ffffff" font-weight="bold">A</text>
<rect x="367" y="110" width="70" height="70" rx="8" fill="#15214c"/><text x="402" y="156" font-size="26" fill="#ffffff" font-weight="bold">C</text>
<rect x="445" y="110" width="70" height="70" rx="8" fill="#e27d00"/><text x="480" y="156" font-size="26" fill="#ffffff" font-weight="bold">E</text>
<rect x="523" y="110" width="70" height="70" rx="8" fill="#15214c"/><text x="558" y="156" font-size="26" fill="#ffffff" font-weight="bold">C</text>
<rect x="601" y="110" width="70" height="70" rx="8" fill="#15214c"/><text x="636" y="156" font-size="26" fill="#ffffff" font-weight="bold">A</text>
<rect x="679" y="110" width="70" height="70" rx="8" fill="#15214c"/><text x="714" y="156" font-size="26" fill="#ffffff" font-weight="bold">R</text>
<text x="480" y="222" font-size="18" fill="#6b6b6b">se lee igual de izquierda a derecha y al revés</text>
</svg>

Reordena las letras de un string (mayúsculas **A–Z**) para formar un **palíndromo**.
Si hay varias soluciones, **cualquiera** sirve. Si es imposible, imprime `NO SOLUTION`.

<small><em>Pista suave:</em> piensa en **cuántas letras** pueden tener frecuencia **impar**.</small>

<small>Enlace: https://cses.fi/problemset/task/1755</small>

---

<!-- _class: title -->

# ¿Dudas?

Gracias por acompañarnos en el track. Ahora a practicar: nos vemos en el contest. ¡Mucho éxito!
 