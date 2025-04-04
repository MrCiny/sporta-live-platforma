# Sporta tiešraides platforma
Autori: Niks Janeks Kreitāls, Ņikita Salarjovs

## Aplikācijas apraksts
Šis projekts ir sporta tiešraižu platformas prototips, kas piedāvā piekļuvi dažādiem sporta veidiem un to saistītajām ziņām un tiešraidēm. Platforma šobrīd ietver piecas sadaļas:
- **Hokejs**
- **Volejbols**
- **Sports (Kopīgi)**
- **Futbols**
- **Basketbols**

Katrā sadaļā ir pieejami raksti un tiešraides, kas saistīti ar attiecīgo sporta veidu. Papildus tam ir arī profila lapa, kur lietotājs var skatīt savu informāciju, iziet no sistēmas un atjaunot savus datus, piemēram, mainīt vārdu un attēlu.

## Uzstādīšanas instrukcijas
### Priekšnosacījumi
- [Node.js](https://nodejs.org/) (ietver npm vai yarn)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) – lai palaistu izstrādes serveri
- Supabase konts un konfigurēts Supabase projekts (datubāze, autentifikācija, utt.)

### Instalācijas un palaišanas soļi
1. Klonēt repozitoriju un pāriet uz projekta mapi:
   ```sh
   git clone https://github.com/MrCiny/sporta-live-platforma.git
   cd sporta-live-platforma
   ```
2. Instalēt atkarības:
   ```sh
   npm install
   ```
3. Palaist izstrādes serveri:
   ```sh
   npm start
   ```
4. Aplikācijai var piekļūt caur `http://localhost:8081/` (vai kāds cits specificēts ports).

## Ekrānšāviņi ar paskaidrojumiem
![pierakstisana](https://github.com/user-attachments/assets/dc6ee979-c94e-41c0-ac45-7cc5d66f89f7)
Autorizācijas lapa - Lietotājs var piereģistrēties, pieslēgties klāt kontam caur e-pastu un GitHub

![tiesraidesEkrans](https://github.com/user-attachments/assets/37249ff4-6b04-40d2-be4e-545de6cc400a)
Tiešraides lapa - Rādās informācija par izvēlēto spēli: spēles ieraksts, spēles rezultāts, kādas komandas spēlē, kāda ir spēles gaita un spēles protokols

![galvenaisEkransTumss](https://github.com/user-attachments/assets/b3f6ae39-07f6-4900-affa-f49544af7a20)
Galvenais ekrāns un pārējie sporta veidu ekrāni (Tumšajā versijā) - Tiek parādīti tādi kā ieskati uz tiešraidēm jeb spēles info, uz rakstiem. Uzklikšķinot uz kādu no tiešraidēm, atveras tiešraides lapa, un atverot rakstu, atveras rakstu lapa 

![galvenaisEkransGaiss](https://github.com/user-attachments/assets/9cff11f7-b7ed-41bc-b4cf-67af872a4263)
Tas pats, kas "Galvenais ekrāns un pārējie sporta veidu ekrāni", bet gaišajā versijā

![raksts](https://github.com/user-attachments/assets/06cb1b73-962e-448e-89df-0e1370eaf7e3)
Rakstu lapa - Parādās informācija par izvēlēto raksut: raksta nosaukums, kas to rakstu publicēja, kad tika publicēts un raksta apraksts 

![profils](https://github.com/user-attachments/assets/fcdf0fa9-9f91-411c-ba4c-5464c51efe34)
Profila lapa - Parādās aktuālākā informācija par lietotāju, var rediģēt šo informāciju

![profilaRedigesana](https://github.com/user-attachments/assets/f6f554b3-63c1-4142-bf72-ed480512f827)
Profila rediģēšana - Var ievadīt nepieciešamos datus un profila bildi

## Izmantotās tehnoloģijas un bibliotēkas
- React – lietotāja interfeisa izstrādei
- Expo – izstrādes servera un mobilās lietotnes palaišanai
- Supabase – datubāzes pārvaldībai, autentifikācijai un API izsaukumiem
- Expo Router – navigācija starp lapām
- React-native, react-native-elements un rneui - komponentes lietotāja interfeisam
- Expo-video - video player, kas ir domāts Expo aplikācijām
- Expo-image-picker - lai varētu izvēlēties attēlus no ierīces priekš profila bildes
- Expo-secure-store un react-native-async-storage - lai uzglabātu un pārvaldītu aplikācijas datus

## Arhitektūras diagramma

## Idejas nākotnei
- Paplašināt sporta sadaļu: Pievienot vairāk sporta veidu un detalizētāku informāciju.
- Notikumu kalendārs: Ievietot funkcionalitāti, kas ļauj lietotājiem pārskatīt nākotnes spēles un notikumus.
- Notikumu paziņojumi: Integrēt paziņojumu sistēmu, lai lietotāji saņemtu ziņas par tiešraides sākumu vai rezultātu atjauninājumiem.
- Analītika un statistika: Pievienot detalizētāku spēļu statistiku un lietotāju analīzi.
- Integrācija ar sociālajiem tīkliem: Ļaut lietotājiem dalīties ar tiešraidēm un rakstiem sociālajos tīklos.
