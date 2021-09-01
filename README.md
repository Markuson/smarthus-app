# Resum

Un sistema per accedir, visualitzar i controlar diferents coses de casa desde un telefon movil i una pagina web.
El sistema controlara les llum conectades de casa (ikea tradfri), el hivernacle, i visualitzara la temoeratura interna i externa

- **V0.1:** App android que quan estem conectats al wifi de casa accedeix a les dades del servidor node-red.
Al servidor node-red conectarem el **hivernacle**, el **gateway tradfri** per controlar les llums i endolls i un **sensor de temperatura i humitat exterior** i un **panell/pantalla per mostrar dades al menjador (??)**.

- **V0.2:** App android es conectara al nuvol quan no estiguem conectats a la xarxa wifi de casa. en aquest nuvol podrem visualitzar la informacio de la casa, pero no podrem controlar res (potser el hivernacle?...).

# Detall
## Hardware:
### Server Node-red:
el servidor node red sera el que rebrá totes les senyals dels diferents dispositius i les processará.
Rebrá les senyals del hivernacle i el sensor de temperatura extern mitjançant mqtt i les señals del tradfri mitjançant les funcions del propi sistema.

### Tradfri gateway:
El gateway tradfri actuara de pasarel·la entre les llums/endolls i el servidor node-red.

### Hivernacle:
El hivernacle enviará al servidor node red la temperatura i la humitat de la terra i rebrá les señals de obrir i tancar la llum del servidor node-red.
**V0.2**: el hivernacle tambe rebra la ordre de regar les plantes.

### Temperatura exterior: 
Constara de un sensor de temperatura y humitat exterior que enviara de forma periodica la lectura de temperatura i humitat cap al servidor node-red. 
Constara de una cpu wemos D1 funcionant en mode deepSleep. Aquest es conectara cada 30 minuts i enviará la lectura de temperatura al servidor.

## Software

### App:
App react-native, sol per android i no publicada.
constara de dos pantalles, una de control de llums i l'altra de control del hivernacle.
També constara de una capçalera on et sortira la temperatura interior y exterior i una visualització de si el sistema esta conectat ok o no. (i una petita previsio meteorologica??).
- **control de llums:** En obrir-la, demanarem al servidor node-red que ens envii un Array de objectes on constaran totes les llums que tenim, el seu nom i el seu status. en pulsar un dels interruptors enviarem al servidor el mateix Array i el servidor buscara les diferencies amb el seu estat actual i actualitzara les llums que pertoquin. Quan el status de les llums canvii, enviarem de nou el ARRAY amb totes les llums.
- **control de hivernacle:** En obrir-la, veurem el status del hivernacle (llum, temperatura y humitat de la terra.). Podrem obrir i tancar el llum manualment o programarla per a que s'obri i es tanqui seguint un horari.
*futur:* 
	- Poder regar les plantes, ja sigui automaticament depenent de la humitat o de forma manual.
	- Incorporar un sensor de lluminositat per poder encendre la llum de forma automatica o calcular/evaluar la cantitat de llum que reben les plantes.

# Futur:
## Hardware:
### Panell informatiu:
Pot ser una pantalla LCD o LED o una matriu LED. en un futur un smartMirror??.
Aquesta recollira la temperatura interior i exterior i també informacio del sistema com per exemple, si algun element no funciona be.
Que mes pot recollir??

## Software:
### App V2:
- Incorporar notificacions (push?)
- conexio desde fora de casa: Podriem afegir un servidor websockets extern al qual ens puguessim conectar quan no detectessim la xarxa wifi de casa nostra. 
- A traves de aquest servidor exter podriem visualitzar el status de la casa i potser controlar algunes coses 

